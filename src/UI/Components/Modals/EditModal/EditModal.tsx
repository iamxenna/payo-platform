import { Dispatch, FC, SetStateAction } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStore } from "Core/store";
import { BottomModalWrapper } from "../BottomModalWrapper/BottomModalWrapper";

interface IEditModal {
  close(): void;
  isVisible: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
}
export const EditModal: FC<IEditModal> = ({ isVisible, setIsOpenModal, setIsModalShown }) => {
  const navigation = useHistory();
  const dispatch = useDispatch();
  const {
    actions: {
      Profile: { clearProfile },
    },
    asyncActions: {
      User: { logout },
    },
  } = useStore((state) => ({
    Profile: state.ProfileEntity,
  }));

  const EditModalConstants = [
    {
      title: "Contact info",
      border: true,
      onClick: () => {
        setIsOpenModal(true);
        setIsModalShown(false);
      },
    },
    {
      title: "Edit profile",
      border: true,
      onClick: () => navigation.push("/profile/update"),
    },
    {
      title: "Log out",
      isRed: true,
      border: false,
      onClick: () => logoutClickHandler(),
    },
  ];
  const logoutClickHandler = () => {
    dispatch(logout());
    dispatch(clearProfile());
    navigation.push("/");
  };

  return (
    <BottomModalWrapper isVisible={isVisible} close={() => setIsModalShown(false)}>
      <div className={styles.content}>
        <div className={styles.container}>
          {EditModalConstants.map((el, idx) => (
            <div key={idx} onClick={el.onClick} className={classNames(styles.item, !el.border && styles.borderNone)}>
              <p className={classNames(styles.title, el?.isRed && styles.titleDecline)}>{el.title}</p>
            </div>
          ))}
        </div>
      </div>
    </BottomModalWrapper>
  );
};
