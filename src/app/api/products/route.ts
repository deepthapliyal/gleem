export const GET = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "GET"
    });
    const products = await response.json();
    
    return Response.json(products)

  } catch (error) {
    console.log(error);
    return Response.json(error)
  }
}
