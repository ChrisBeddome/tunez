import { useRouter } from 'next/router'

export default function CategoryPage() {
  const router = useRouter();
  const categoryName = router.query.category
  
  return <div>{categoryName}</div>
}