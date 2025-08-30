// plugins/userAnalytics.js
import fp from 'fastify-plugin';
import geoip from 'geoip-lite';

export default fp(async function userAnalyticsPlugin(fastify) {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      const ip =
        request.headers['x-forwarded-for']?.split(',')[0] || request.ip;

      const ua = request.headers['user-agent'] || '';
      const deviceType = /mobile/i.test(ua) ? 'mobile' : 'pc';

      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize to midnight

      const geo = geoip.lookup(ip);
      const country = geo?.country || null;
      const region = geo?.region || null;
      const city = geo?.city || null;

      await fastify.prisma.userAnalytics.upsert({
        where: {
          ip_date: {
            ip,
            date: today,
          },
        },
        update: {},
        create: {
          ip,
          date: today,
          deviceType,
          country,
          region,
          city,
        },
      });
    } catch (err) {
      fastify.log.error('Analytics error:', err);
    }
  });
});
