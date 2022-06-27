import { useRouter } from "next/router";
import Link from "next/link";

export default function CategoryPage() {
  const router = useRouter();
  const categoryName = router.query.category;

  return (
    <div>
      {categoryName}
      <br />
      <Link href="/">
        <a href="">
          Back to Home
          <span className="material-symbols-outlined">arrow_back</span>
        </a>
      </Link>
    </div>
  );
}
