export const POST = async (request: Request) => {
  return new Response(
    JSON.stringify({
      data: {
        token: '123',
      },
    }),
    { status: 200 }
  );
};
