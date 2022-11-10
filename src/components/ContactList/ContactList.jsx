import "./ContactList.css";
import Loader from "../Loader/Loader";
import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  useGetContactsQuery,
  useDeleteContactMutation,
  useEditContactMutation,
  useUpdateFavoriteMutation,
} from "../../Redux/reducer";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import EditForm from "../Forms/EditForm";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ContactList = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [page, setPage] = useState(1);

  const filter = useSelector((state) => state.filter);
  const {
    data,
    isLoading: isGetLoading,
    refetch,
  } = useGetContactsQuery({ page, filter });

  const [deleteContact, { isLoading: isMutationLoading }] =
    useDeleteContactMutation();
  const [editContact] = useEditContactMutation();
  const [updateFavorite] = useUpdateFavoriteMutation();

  useEffect(() => {
    refetch();
  }, []);

  const toggleModal = (contact) => {
    setShowModal(!showModal);
    setCurrentContact(contact);
  };
  const onEdit = (newContact) => {
    editContact(newContact);
    toggleModal();
  };

  return (
    <>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <button type="button" onClick={toggleModal} className="close-btn">
            Close
          </button>
          <EditForm contact={currentContact} onEdit={onEdit} />
        </Modal>
      )}

      {isGetLoading && <Loader></Loader>}
      {isMutationLoading && <Loader></Loader>}
      {data?.contacts && !isMutationLoading && (
        <ul className="contacts-list">
          {data.contacts.map((contact) => {
            return (
              <li className="contacts-item" key={contact._id}>
                {contact.name}:{" "}
                <span className="contacts-number">{contact.number}</span>
                <button
                  className="favotite-btn"
                  type="button"
                  onClick={() => {
                    updateFavorite({
                      id: contact._id,
                      favorite: !contact.favorite,
                    });
                  }}
                >
                  <BsStarFill
                    className="favorite-icon"
                    style={{ fill: contact.favorite && "rgb(255, 244, 84)" }}
                  />
                </button>
                <button
                  className="button edit-btn"
                  type="button"
                  onClick={() => toggleModal(contact)}
                >
                  Edit
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    deleteContact(contact._id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <Stack alignItems="center">
        <Pagination
          count={data?.total > 5 ? Math.ceil(data.total / 5) : 1}
          variant="outlined"
          onChange={(event, value) => {
            setPage(value);
          }}
        />
      </Stack>
    </>
  );
};

export default ContactList;
