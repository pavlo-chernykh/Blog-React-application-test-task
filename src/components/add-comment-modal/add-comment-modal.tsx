import { FC } from 'react';
import { Form, Modal } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RuleObject } from 'antd/lib/form';

import * as St from './add-comment-modal.styled';
import { NotificationType, useOpenNotification } from 'src/UI/notification';
import { PrimaryButton } from 'src/UI/button';
import { modalValues } from 'src/consts';
import { IComment, ICreateCommentModal } from 'types/comment';
import { useAddCommentMutation } from '@redux/store/commentsAPI';

export const AddCommentModal: FC<ICreateCommentModal> = ({isCommentModalOpen, setIsCommentModalOpen, id}) => {
  const [form] = Form.useForm();
  const { handleSubmit, control } = useForm<IComment>();
  const [addComment] = useAddCommentMutation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const nameValue = Form.useWatch('name', form);
  const emailValue = Form.useWatch('email', form);
  const messageValue = Form.useWatch('body', form);

  const nameRules: RuleObject[] = [
    {
      required: true,
      message: 'Please enter your name',
    },
    {
      min: 3,
      message: 'Name must be at least 3 characters',
    },
  ];

  const onFinishHandler: SubmitHandler<IComment> = async (
    values,
  ): Promise<void> => {
    try {
      form.resetFields();
        const payload = {...values, postId: id}
        await addComment(payload);
        setIsCommentModalOpen(false);
        openNotificationWithIcon(
          NotificationType.SUCCESS,
          'Success!',
          'Comment successfully added',
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
      title='Post Comment'
      open={isCommentModalOpen}
      centered
      onCancel={() => setIsCommentModalOpen(false)}
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
            name='name'
            control={control}
            render={({ field }) => (
              <Form.Item {...field}>
                <St.StyledTitle placeholder='Enter your name'/>
              </Form.Item>
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Form.Item {...field}>
                <St.StyledTitle placeholder='Enter your email'/>
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
                  placeholder='Please provide post feedback here'
                  maxLength={modalValues.txAreaMaxLength}
                />
              </St.StTextContainer>
            )}
          />
          <PrimaryButton
            disabled={!nameValue || !emailValue || !messageValue}
            htmlType="submit"
            size="large"
          >
            Submit
          </PrimaryButton>
        </St.StyledFormWrapper>
      </Form>
  </Modal>
  )
}
