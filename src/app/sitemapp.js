import { MetadataRoute } from 'next'


export default async function sitemap() {

  const res = await fetch(`${process.env.API_URL}/posts`)

  const clanpraises = await res.json()


  function getUniqueObjectsWithDuplicates(arr, key) {
      const countMap = {}
      const firstSeenMap = {}

      for (const obj of arr) {
        const value = obj[key]

        if (typeof value !== "string") continue

        countMap[value] = (countMap[value] || 0) + 1

        // store first occurrence only
        if (!firstSeenMap[value]) {
          firstSeenMap[value] = obj
        }
      }

      return Object.keys(countMap)
        .filter(value => countMap[value] > 1)
        .map(value => firstSeenMap[value])
    }

    const similarTribes = getUniqueObjectsWithDuplicates(clanpraises, 'tribe')
    const similarClans = getUniqueObjectsWithDuplicates(clanpraises, 'title')

    const clanpraises_ByID_Routes = clanpraises.map((post) => ({
    url: `https://clanpraises.com/${post.tribe}/${post.title}/${post.id}`,
    //lastModified: new Date(post.createdAt),
    }))

    const clanpraises_ByClan_Routes = similarClans.map((post) => ({
    url: `https://clanpraises.com/${post.tribe}/${post.title}`,
    //lastModified: new Date(post.createdAt),
    }))

    const tribe_ClanList_Routes = similarTribes.map((post) => ({
      url: `https://clanpraises.com/${post.tribe}`,
      //lastModified: new Date(post.createdAt),
    }))

  return [
    {
      url: 'https://clanpraises.com',
      //lastModified: new Date(),
    },
    {
      url: 'https://clanpraises.com/about',
      //lastModified: new Date(),
    },
    ...clanpraises_ByID_Routes,
     ...clanpraises_ByClan_Routes,
     ...tribe_ClanList_Routes,
  ]
}


