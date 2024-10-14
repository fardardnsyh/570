import { FieldValue, Timestamp } from "firebase/firestore";

export function formatFirebaseTime(firebaseTimestamp :  Timestamp | FieldValue | any) {

    const date = firebaseTimestamp.toDate();
    const options : object = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }
