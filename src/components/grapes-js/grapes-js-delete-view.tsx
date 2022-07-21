import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteGrapesJsMutation } from "@data/grapes-js/use-grapes-js-delete.mutation";

const GrapesJsDeleteView = () => {
  const { mutate: deleteCategory, isLoading: loading } =
    useDeleteGrapesJsMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  function handleDelete() {
    deleteCategory(data);
    closeModal();
  }
  console.log("readchje");
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default GrapesJsDeleteView;
