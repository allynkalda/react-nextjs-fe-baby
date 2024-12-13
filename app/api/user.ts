export async function getUser(email: string) {
  const response = await fetch(`http://localhost:8080/user?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  return response.json()
}
