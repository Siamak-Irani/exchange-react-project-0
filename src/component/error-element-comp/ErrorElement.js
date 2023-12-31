import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import ErrorBox from "./ErrorBox";

function ErrorElement({ err = null }) {
  const navigate = useNavigate();

  const routerError = useRouteError();
  const error = err || routerError;

  let title = "خطایی پیش آمد!";
  let message = "ظاهرا مشکلی پیش آمده است.";

  // switch (error.status) {
  //   case 400:
  //     title = "درخواست نامعتبر!";
  //     message = "سرور نتوانست درخواست را درک کند.";
  //     break;
  //   case 401:
  //     title = "تأیید نشده!";
  //     message = "برای دسترسی به این منبع، احراز هویت لازم است.";
  //     break;
  //   case 404:
  //     title = "یافت نشد!";
  //     message = "منبع یا صفحه مورد نظر یافت نشد.";
  //     break;
  //   case 500:
  //     title = "خطای سرور داخلی!";
  //     message = "سرور با یک خطای داخلی مواجه شد.";
  //     break;
  // }


  return (
    <>
      <ErrorBox title={title} message={message} />
    </>
  );
}

export default ErrorElement;
