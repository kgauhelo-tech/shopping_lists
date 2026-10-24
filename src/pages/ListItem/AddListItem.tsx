import React, { useRef, useState, type FormEvent } from "react";
import { ContentContainer } from "../../components/ContentContainer";
import { TextInput } from "../../components/Input/TextInput";
import { ArrowLeftCircle } from "reicon-react";
import styles from "./ListItem.module.css";
import Text from "../../components/Text/Text";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { createListItem } from "../../redux/slices/ListItemSlice";

export const AddListItem = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const quantityRef = useRef<HTMLInputElement | null>(null);

  const [imgBase64, setImgBase64] = useState<string>("");

  const { id: listId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!listId) return;

    const name = nameRef.current?.value?.trim() || "";
    const description = descRef.current?.value?.trim() || "";
    const quantity = quantityRef.current?.value?.trim() || "";

    if (!name || !description || !quantity) return;

    try {
      await dispatch(
        createListItem({
          name,
          description,
          quantity,
          imgLink: imgBase64,
          listId,
        }),
      ).unwrap();

      handleNavigateBack();
    } catch (error) {
      console.error("Failed to create list item:", error);
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <ContentContainer className={styles["list-form-container"]}>
        <form className={styles["list-form"]} onSubmit={handleSubmitForm}>
          <div className={styles.heading}>
            <div>
              <ArrowLeftCircle
                onClick={handleNavigateBack}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Text variant="h2">Add New Item</Text>
          </div>

          <div className={styles["input-container"]}>
            <TextInput
              inputRef={nameRef}
              label={"Item Name"}
              placeholder="Enter item name"
            />

            <TextInput
              inputRef={descRef}
              label={"Item Description"}
              placeholder="Enter item description"
            />

            <TextInput
              inputRef={quantityRef}
              label={"Quantity"}
              placeholder="Enter quantity (e.g., 2, 1kg)"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                margin: "10px 0",
              }}
            >
              <Text>Item Image (Optional)</Text>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ color: "white" }}
              />
              {imgBase64 && (
                <div style={{ marginTop: "8px" }}>
                  <img
                    src={imgBase64}
                    alt="Selected preview"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  />
                </div>
              )}
            </div>

            <button type="submit" style={{ marginTop: "12px" }}>
              <Text>Save Item</Text>
            </button>
          </div>
        </form>
      </ContentContainer>
    </div>
  );
};
