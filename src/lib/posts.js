
export async function getAllPosts() {

  const res = await fetch(`${process.env.API_URL}/posts`, {
    next: { revalidate: 3600 }
  })
  return res.json()
  
}
