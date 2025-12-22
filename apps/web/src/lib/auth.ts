export const saveToken = (token: string) => {
  localStorage.setItem(
    "accessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMzAxOWUxZC0zZWEzLTQzNTAtYTI4Yi1lMWI2NzMwZTMwYzUiLCJpYXQiOjE3NjY0Mjk3MzEsImV4cCI6MTc2NjQzNjkzMX0.KtbDam-WzjE9gbh2-KE6lw8KJPnZa-5Pxcw4bBMLaoo"
  );

  //   localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
   localStorage.setItem(
    "accessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMzAxOWUxZC0zZWEzLTQzNTAtYTI4Yi1lMWI2NzMwZTMwYzUiLCJpYXQiOjE3NjY0Mjk3MzEsImV4cCI6MTc2NjQzNjkzMX0.KtbDam-WzjE9gbh2-KE6lw8KJPnZa-5Pxcw4bBMLaoo"
  );

  return localStorage.getItem("accessToken");
};
