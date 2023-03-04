import { FC } from 'react';
import { Form, Modal } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import * as St from './add-post-modal.styled';
import { ICreatePost, ICreatePostModal } from 'types/posts';
import { NotificationType, useOpenNotification } from 'src/UI/notification';
import { PrimaryButton } from 'src/UI/button';
import { modalValues } from 'src/consts';
import { useAddPostMutation } from '@redux/store/postsAPI';

export const AddPostModal: FC<ICreatePostModal> = ({isModalOpen, setIsModalOpen}) => {
  const [form] = Form.useForm();
  const { handleSubmit, control } = useForm<ICreatePost>();
  const [addPost] = useAddPostMutation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const messageValue = Form.useWatch('title', form);

  const onFinishHandler: SubmitHandler<ICreatePost> = async (
    values,
  ): Promise<void> => {
    try {
      form.resetFields();
        await addPost(values);
        setIsModalOpen(false);
        
        openNotificationWithIcon(
          NotificationType.SUCCESS,
          'Success!',
          'Post successfully created',
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
      title='Create new post'
      open={isModalOpen}
      centered
      onCancel={() => setIsModalOpen(false)}
      width={700}
      footer={null}
     >
      <Form
        name={modalValues.formName}
        form={form}
        onFinish={
          handleSubmit(onFinishHandler)
        }
      >
        <St.StyledFormWrapper>
          {contextHolder}
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <Form.Item {...field}>
                <St.StyledTitle placeholder='Enter post tile...'/>
              </Form.Item>
            )}
          />
          <Controller
            name='body'
            control={control}
            render={({ field }) => (
              <St.StTextContainer {...field}>
                <St.StTextArea
                  autoSize={{
                    minRows: modalValues.txtAreaMinSize,
                    maxRows: modalValues.txtAreaMaxSize,
                  }}
                  placeholder='Enter post description...'
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
            Create Post
          </PrimaryButton>
        </St.StyledFormWrapper>
      </Form>
  </Modal>
  )
}
