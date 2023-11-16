import { Draggable } from "@hello-pangea/dnd";
import CategoryItem from "@/components/CategotyItem/CategoryItem";
import React from "react";
import { Category } from "@/types/Category";

type Props = {
  filteredCategory: Category[],
  categoryUpdateStatus: Category[] | [],
  setCategoryUpdateStatus: React.Dispatch<React.SetStateAction<Category[]>>,
  setIdForDelete: (id: string) => void,
  setStatusDelete: (status: boolean) => void,
}

export default function Categories ({
 filteredCategory,
 categoryUpdateStatus,
 setCategoryUpdateStatus,
 setIdForDelete,
 setStatusDelete,
}: Props) {
  return (
    <>
      {filteredCategory.map(({name, status, id}, index) => {
        const actualStatus = categoryUpdateStatus
          .find(category => category.id === id);

        return (
          <Draggable
            key={id}
            draggableId={id}
            index={index}
          >
            {(provided) => (
              <div
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                ref={provided.innerRef}
              >
                <CategoryItem
                  setCategoryUpdateStatus={setCategoryUpdateStatus}
                  categoryUpdateStatus={categoryUpdateStatus}
                  actualStatus={actualStatus}
                  category={{name, status, id}}
                  setIdForDelete={setIdForDelete}
                  setStatusDelete={setStatusDelete}
                />
              </div>
            )}
          </Draggable>
        )})}
    </>
  )
}
