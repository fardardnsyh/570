

export function isValidMessageText(value: string, maxLength : number): boolean{

    // Check for whiteSpace
    if (!value.replace(/\s/g, '').length) {
        return false;
    }

    // Check if length of the message is greater than maxLength
    if(value.length > maxLength){
        return false
    }
    
    return true
}