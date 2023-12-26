import React, { Dispatch, FC } from "react";
import styles from "Pages/Profile/Update/styles.module.css";
import { Input } from "Components/Input/Input";
import Select, { Option } from "Components/Select/Select";
import { Button } from "Components/Button/Button";
import { Link, useHistory } from "react-router-dom";
import { slIcons } from "utils/icons";
import { Close } from "Components/Assets";
import { IProfileUpdateState } from "Pages/Profile/Update/ProfileUpdate.interfaces";
import { IUserType } from "Core/UserType/UserTypeEntity";

interface MainInfoProps {
  updateState: IProfileUpdateState;
  setUpdateState: Dispatch<Partial<IProfileUpdateState>>;
  types: IUserType[];
  addLinkData: { name: string; link: string };
  setAddLinkData: Dispatch<React.SetStateAction<{ name: string; link: string }>>;
  updateProfile: () => Promise<void>;
  setImageFile: Dispatch<React.SetStateAction<File | null>>;
  deleteLink: (idx: number) => void;
  snAddHandler: () => void;
}
export const MainInfo: FC<MainInfoProps> = ({
  updateState,
  setUpdateState,
  types,
  addLinkData,
  updateProfile,
  setAddLinkData,
  setImageFile,
  deleteLink,
  snAddHandler,
}) => {
  const location = useHistory();
  return (
    <div>
      <div className={styles.avatar} style={{ "--bg-image": `url('${updateState.avatar}')` } as React.CSSProperties} />
      <div className={styles.mainInfo}>
        <div className={styles.userNAvatar}>
          <div className={styles.userName}>
            <Input
              type="text"
              variant="default"
              title="Username"
              value={updateState.userName}
              onChange={({ target }) => setUpdateState({ userName: target.value })}
              placeholder={"Type a username"}
              isImportant
              max={16}
              min={1}
            />
          </div>
          <Input
            type="file"
            variant="file"
            value={updateState.avatar}
            onChange={({ target }: any) => setImageFile(target.files[0])}
            placeholder=""
          />
        </div>
        <Input
          type="text"
          variant="bigText"
          title="About"
          value={updateState.description}
          onChange={({ target }) => setUpdateState({ description: target.value })}
          placeholder={"Type a description"}
        />
        <Select
          value={updateState.type}
          title={"Type of user"}
          onChange={(value) => setUpdateState({ type: value.toString() })}
        >
          {types.map(({ id, title }) => (
            <Option key={id} value={title}>
              {title}
            </Option>
          ))}
        </Select>
        <div className={styles.tNumber}>
          <Input
            type="text"
            variant="default"
            title="Phone number"
            value={updateState.tNumber}
            onChange={({ target }) => setUpdateState({ tNumber: target.value })}
            placeholder={"Type your number"}
          />
        </div>
        <Input
          type="text"
          variant="default"
          title="Website"
          value={updateState.website}
          onChange={({ target }) => setUpdateState({ website: target.value })}
          placeholder={"https://"}
        />
        <div className={styles.addLinkContainer}>
          <Input
            classWrapper={styles.inputWrapper}
            type="text"
            variant="default"
            title="Social Networks"
            value={addLinkData.name}
            onChange={({ target }) => setAddLinkData((prev) => ({ ...prev, name: target.value }))}
            placeholder={"Enter link name"}
          />
          <Input
            classWrapper={styles.inputWrapper}
            type="text"
            variant="default"
            value={addLinkData.link}
            onChange={({ target }) => setAddLinkData((prev) => ({ ...prev, link: target.value }))}
            placeholder={"Enter link URL"}
          />
          <Button variant="primary" opClassName={styles.addBtn} onClick={snAddHandler}>
            Add
          </Button>
        </div>
        <div className={styles.snContainer}>
          {updateState.socialNetworks.map(({ type, network, title }, idx) => (
            <Link key={idx} to={`/redirect?link=${network}`}>
              <div className={styles.snUnit}>
                <div className={styles.snContent}>
                  <div className={styles.link}>{slIcons[type as keyof typeof slIcons]()}</div>{" "}
                  <p className={styles.snTitle}>{title}</p>
                </div>
                <div onClick={() => deleteLink(idx)}>
                  <Close />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.btnContainer}>
          <Button variant="primary" opClassName={styles.cancelBtn} onClick={() => location.goBack()}>
            Cancel
          </Button>
          <Button variant="primary" opClassName={styles.saveBtn} onClick={updateProfile}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
