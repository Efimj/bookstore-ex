import { FC } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

import BookForm, {
  PublishBookFormValues,
} from "../../components/BookForm/BookForm";

export const PublishBookPageRoute = "/publish";
export const NavigatePublishBookPageRoute = (): string => `/publish`;

export interface IPublishBookPage {}

const PublishBookPage: FC<IPublishBookPage> = ({}) => {
  const handlePublish = async (values: PublishBookFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Published:", values);
  };

  return (
    <PageWrapper>
      <BookForm onPublish={handlePublish}></BookForm>
    </PageWrapper>
  );
};

export default PublishBookPage;
