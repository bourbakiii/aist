export default (text: string) => {
    return text.replace(/(<([^>]+)>)/gi, '');
};
