import { Layout } from 'antd';
import { useCallback } from 'react';
import { useModalContainer } from '../../shared/hooks/useModalContainer';
import { useNotesCrud } from '../../features/notes/hooks/useNotesCrud';
import { CreateNoteModalPortal } from '../../features/notes/ui/CreateNoteModalPortal/CreateNoteModalPortal';
import { NotesTable } from '../../features/notes/ui/NotesTable/NotesTable';

const { Content } = Layout;

export function MainPage() {
  const {
    isOpen: isCreateModalOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModalContainer();
  const { notes, loading, creating, deletingIds, createNoteRecord, deleteNoteRecord } =
    useNotesCrud();

  const handleCreate = useCallback(
    async (text: string) => {
      await createNoteRecord(text);
      closeCreateModal();
    },
    [closeCreateModal, createNoteRecord],
  );

  return (
    <Layout className="app-shell">
      <Content className="app-content">
        <NotesTable
          notes={notes}
          loading={loading}
          deletingIds={deletingIds}
          onDelete={deleteNoteRecord}
          onCreateClick={openCreateModal}
        />
      </Content>

      <CreateNoteModalPortal
        open={isCreateModalOpen}
        loading={creating}
        onClose={closeCreateModal}
        onSubmit={handleCreate}
      />
    </Layout>
  );
}
