import { useRef } from "react";
import { ContentContainer } from "../../components/ContentContainer";
import styles from "./Lists.module.css";
import { TextInput } from "../../components/Input/TextInput";
import Text from "../../components/Text/Text";

export const Lists = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitForm = () => {};
  return (
    <ContentContainer className={styles["list-form-container"]}>
      <form className={styles["list-form"]}>
        <TextInput
          ref={nameRef}
          label={"List Name"}
          onChange={() => {}}
          placeholder="Enter list name"
        />

        <TextInput
          ref={descRef}
          label={"List Description"}
          onChange={() => {}}
          placeholder="Enter list description"
        />

        <TextInput
          ref={categoryRef}
          label={"List Category"}
          onChange={() => {}}
          placeholder="Enter list category"
        />

        <TextInput
          textAreaRef={notesRef}
          label="Notes (Optional)"
          onChange={() => {}}
        />

        <button onSubmit={handleSubmitForm}>
          <Text>Save List</Text>
        </button>
      </form>
    </ContentContainer>
  );
};
