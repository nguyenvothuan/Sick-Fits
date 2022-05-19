// [id]: only in Next. So, product/[id] means, whenever we follow an id of an item, that id will be matched here. So quick ha
// can be nested like /product/[id]/[name]/...
import SingleProduct from "../../components/SingleProduct";
export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
