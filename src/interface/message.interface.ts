import { FieldValue, Timestamp } from "firebase/firestore";

interface IMessageBody {
    messageBody     : string,
    receiver?        : string,
    createdAt       : Timestamp | FieldValue | any,
    messageId       : string
}

export default IMessageBody;