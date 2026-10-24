import { useRef } from "react";
import { ContentContainer } from "../../components/ContentContainer";
import styles from "./Lists.module.css";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";
import { useAppDispatch } from "../../redux/hooks";
import { createList } from "../../redux/slices/ListSlice";
import { useNavigate } from "react-router";
import { ArrowLeftCircle } from "reicon-react";

export const AddList = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Read form values
    const name = nameRef.current?.value;
    const description = descRef.current?.value;
    const notes = notesRef.current?.value;
    const category = categoryRef.current?.value;

    if (!name?.trim()) return;
    if (!description?.trim()) return;
    if (!category?.trim()) return;

    try {
      await dispatch(
        createList({
          name,
          description,
          notes: notes || "",
          category,
          dateCreated: new Date().toISOString(),
        }),
      ).unwrap();

      handleNavigateBack();
    } catch (error) {
      console.error("Failed to create list:", error);
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
            <ArrowLeftCircle onClick={handleNavigateBack} />
          </div>
          <Text variant="h2">Add New List</Text>
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
            <Text>Save List</Text>
          </button>
        </div>
      </form>
    </ContentContainer>
  );
};
