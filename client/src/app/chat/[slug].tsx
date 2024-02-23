import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Page({ dados }: any) {
  const router = useRouter();
  const path = usePathname();

  console.log(dados);
  console.log(path);
  return (
    <>
      <p>Post: {router.query.slug}</p>
    </>
  );
}
