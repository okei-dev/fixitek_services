import React from "react";
import { Category } from "@/types/category";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import CategoryIcon from "@/components/CategoryIcon";


interface Props {
  category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {

  return (
    <li className="m-4 text-center hover:text-[var(--neutral--100)] bg-[var(--neutral--100)] shadow-lg rounded-3xl overflow-hidden">
      <div className="relative flex justify-center">
        <img
          src={category.photo_url || "/img/furniture.jpg"}
          alt={category.name || "Category"}
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="absolute -bottom-5 rounded-full border-3 border-white p-4 bg-[var(--accent--primary-1)]">
          <CategoryIcon id={category.id} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold py-4 text-2xl text-[var(--neutral--800)] hover:text-[var(--accent--primary-1)]">
          {category.name}
        </h3>
        <p className="">{category.description}</p>

        <Link
          to={`/categories/${category.id}/services/`}
          className="flex justify-center items-center gap-2 text-sm text-[var(--secondary--color-2)] hover:text-[var(--accent--primary-1)] mt-2 p-3"
        >
          View Services <GoArrowRight />
        </Link>
      </div>
    </li>
  );
};

export default CategoryCard;
