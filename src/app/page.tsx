"use client";
import styles from './page.module.scss'
import React, { useState } from "react";
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { initialCategory } from "@/constants/initialCategory";
import Header from "@/components/Header/Header";
import CreateCategoryButton from "@/components/CreateCategoryButton/CreateCategoryButton";
import FormNewCategory from "@/components/FormNewCategory/FormNewCategory";
import { Category } from "@/types/Category";
import SaveCancelCategory from "@/components/SaveCancelCategory";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal/DeleteConfirmationModal";
import Categories from "@/components/Categories/Categories";


const useLocalStorage = (key: string, initialValue: Category[]) => {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: Category[] | ((prevState: Category[]) => Category[])) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue];
}

export default function Home() {
  const [addCategory, setAddCategory] = useState(false);
  const [categories, setCategories] =
    useLocalStorage('allCategories', [initialCategory]);
  const [query, setQuery] = useState('');
  const [statusDelete, setStatusDelete] = useState<boolean>(false);
  const [idForDelete, setIdForDelete] = useState<string>('');
  const [categoryUpdateStatus, setCategoryUpdateStatus] =
    useState<Category[] | []>([]);

  const filteredCategory: Category[] = categories.length
    ? categories.filter(({ name }: Category) => name.toLowerCase().includes(query.trim().toLowerCase()))
    : [initialCategory];

  const handleDragDrop = (res: any) => {
    const {source, destination, type} = res;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId
      && source.index === destination.index
    ) {
      return;
    }

    if (type === 'group') {
      const reorderedCategories = [...categories];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedCategories] = reorderedCategories.splice(sourceIndex, 1);
      reorderedCategories.splice(destinationIndex, 0, removedCategories);
      return setCategories(reorderedCategories)
    }
  }

  const handleStatusCategory = (id: string, status: boolean | undefined) => {
    setCategories((prevState: Category[] | undefined) => {
      if (prevState) {
        return prevState.map(oneCategory => {
          if (oneCategory.id === id) {
            return { ...oneCategory, status: !status };
          }
          return oneCategory;
        });
      }
      return [];
    });
  }

    return (
    <div>
      {statusDelete && (
        <DeleteConfirmationModal
          idForDelete={idForDelete}
          setIdForDelete={setIdForDelete}
          setCategories={setCategories}
          setStatusDelete={setStatusDelete}
        />
      )}
      <Header setQuery={setQuery} />

      <main className={styles.categories}>
       <CreateCategoryButton
         setAddCategory={setAddCategory}
         addCategory={addCategory}
       />

        {addCategory && (
          <FormNewCategory
            setIdForDelete={setIdForDelete}
            setStatusDelete={setStatusDelete}
            handleStatusCategory={handleStatusCategory}
            setCategories={setCategories}
            setAddCategory={setAddCategory}
          />
        )}

        <DragDropContext onDragEnd={handleDragDrop}>
           <Droppable droppableId="ROOT" type="group">
             {(provided) => (
               <div  {...provided.droppableProps} ref={provided.innerRef}>
                 <Categories
                   filteredCategory={filteredCategory}
                   categoryUpdateStatus={categoryUpdateStatus}
                   setCategoryUpdateStatus={setCategoryUpdateStatus}
                   setIdForDelete={setIdForDelete}
                   setStatusDelete={setStatusDelete}
                 />
               </div>
             )}
           </Droppable>
        </DragDropContext>
      </main>

      {!!categoryUpdateStatus.length && (
       <SaveCancelCategory
         handleStatusCategory={handleStatusCategory}
         categoryUpdateStatus={categoryUpdateStatus}
         setCategoryUpdateStatus={setCategoryUpdateStatus}
       />
      )}
    </div>
  )
}
