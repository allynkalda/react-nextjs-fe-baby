export async function getChild(parentId: number) {
    const response = await fetch(`http://localhost:8080/child?parent_id=${parentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
      return !response.body ? [] : response.json()
  }
