import { useEffect, useRef } from "react";
import { ContentContainer } from "../../components/ContentContainer";
import styles from "./Lists.module.css";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateList } from "../../redux/slices/ListSlice";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftCircle } from "reicon-react";
import type { List } from "../../types/types";

export const EditList = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const targetList = useAppSelector((state) =>
    state.lists.items.find((list: List) => list.id === id),
  );

  useEffect(() => {
    if (targetList) {
      if (nameRef.current) nameRef.current.value = targetList.name;
      if (descRef.current) descRef.current.value = targetList.description;
      if (categoryRef.current) categoryRef.current.value = targetList.category;
      if (notesRef.current) notesRef.current.value = targetList.notes || "";
    }
  }, [targetList]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetList || !id) return;

    // Read form values
    const name = nameRef.current?.value;
    const description = descRef.current?.value;
    const notes = notesRef.current?.value;
    const category = categoryRef.current?.value;

    if (!name?.trim()) return;
    if (!description?.trim()) return;
    if (!category?.trim()) return;

    const updatedList = {
      ...targetList,
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      notes: notes?.trim() || "",
    };

    try {
      await dispatch(updateList(updatedList)).unwrap();
      handleNavigateBack();
    } catch (error) {
      console.error("Failed to update list:", error);
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <ContentContainer className={styles["list-form-container"]}>
      <form className={styles["list-form"]} onSubmit={handleSubmitForm}>
        <div className={styles.heading}>
          <div>
            <ArrowLeftCircle
              onClick={handleNavigateBack}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Text variant="h2">Edit List</Text>
        </div>

        <div className={styles["input-container"]}>
          <TextInput
            inputRef={nameRef}
            label={"List Name"}
            placeholder="Enter list name"
          />

          <TextInput
            inputRef={descRef}
            label={"List Description"}
            placeholder="Enter list description"
          />

          <TextInput
            inputRef={categoryRef}
            label={"List Category"}
            placeholder="Enter list category"
          />

          <TextInput
            type="textarea"
            textAreaRef={notesRef}
            label="Notes (Optional)"
          />

          <button type="submit">
            <Text>Save Changes</Text>
          </button>
        </div>
      </form>
    </ContentContainer>
  );
};
