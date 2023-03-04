import { FC } from 'react';
import { Form, Modal } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import * as St from './edit-post-modal.styled';
import { IEditBody, IEditPost, IEditPostModal } from 'types/posts';
import { NotificationType, useOpenNotification } from 'src/UI/notification';
import { PrimaryButton } from 'src/UI/button';
import { modalValues } from 'src/consts';
import { useUpdatePostMutation } from '@redux/store/postsAPI';

export const EditPostModal: FC<IEditPostModal> = ({isEditModalOpen, setIsEditModalOpen, initialValues}) => {
  const [form] = Form.useForm();
  const { handleSubmit, control } = useForm<IEditPost>();
  const [updatePost] = useUpdatePostMutation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const messageValue = Form.useWatch('title', form);

  const onFinishHandler: SubmitHandler<IEditPost> = async (
    values,
  ): Promise<void> => {
    try {
      form.resetFields();
        const payload: IEditBody = {id: initialValues.id, body: values}
        await updatePost(payload);
        setIsEditModalOpen(false);
        
        openNotificationWithIcon(
          NotificationType.SUCCESS,
          'Success!',
          'Post successfully edited',
        );

    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        'Fail!',
        'Unexpected error occurred',
      );
    }
  };

  return (
    <Modal
      title='Edit post'
      open={isEditModalOpen}
      centered
      onCancel={() => setIsEditModalOpen(false)}
      width={700}
      footer={null}
     >
      <Form
        name={modalValues.formEditName}
        form={form}
        initialValues={initialValues}
        onFinish={
          handleSubmit(onFinishHandler)
        }
      >
        <St.StyledFormWrapper>
          {contextHolder}
          <Controller
            name='title'
            control={control}
            defaultValue={initialValues.title}
            render={({ field }) => (
              <Form.Item {...field}>
                <St.StyledTitle placeholder='Edit post tile...'/>
              </Form.Item>
            )}
          />
          <Controller
            name='body'
            control={control}
            defaultValue={initialValues.body}
            render={({ field }) => (
              <St.StTextContainer {...field}>
                <St.StTextArea
                  autoSize={{
                    minRows: modalValues.txtAreaMinSize,
                    maxRows: modalValues.txtAreaMaxSize,
                  }}
                  placeholder='Edit post description...'
                  maxLength={modalValues.txAreaMaxLength}
                />
              </St.StTextContainer>
            )}
          />
          <PrimaryButton
            disabled={!messageValue}
            htmlType="submit"
            size="large"
          >
            Edit Post
          </PrimaryButton>
        </St.StyledFormWrapper>
      </Form>
  </Modal>
  )
}
