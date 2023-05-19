// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const token = localStorage?.getItem("token");

  res.status(200).json({ token });
}
