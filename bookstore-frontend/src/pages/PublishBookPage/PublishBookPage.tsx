import { FC } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

import BookForm, {
  PublishBookFormValues,
} from "../../components/BookForm/BookForm";
import { PublishBookData, postPublishBook } from "../../api/book";
import IUser from "../../interfaces/IAuthor";
import { useNavigate } from "react-router-dom";
import { NavigateBookPageRoute } from "../BookPage/BookPage";
import dayjs from "dayjs";

export const PublishBookPageRoute = "/publish";
export const NavigatePublishBookPageRoute = (): string => `/publish`;

export interface IPublishBookPage {}

const PublishBookPage: FC<IPublishBookPage> = ({}) => {
  const navigate = useNavigate();

  const handlePublish = async (values: PublishBookFormValues) => {
    if (values.image === null) return;
    const data: PublishBookData = {
      title: values.title,
      description: values.description,
      image: values.image,
      pages: values.pages,
      authors: values.authors.map((user: IUser) => {
        return user.user_id;
      }),
      ageRestrictions: values.ageRestrictions.age_restriction_id,
      publicationDate: dayjs(values.publicationDate).toDate(),
    };
    const book_id: string = await postPublishBook(data);
    navigate(NavigateBookPageRoute(book_id));
  };

  return (
    <PageWrapper>
      <BookForm onPublish={handlePublish}></BookForm>
    </PageWrapper>
  );
};

export default PublishBookPage;
