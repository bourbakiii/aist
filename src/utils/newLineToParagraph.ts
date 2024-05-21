export default (text: string) => {
    text = text.replaceAll(/\n/g, '</p><p>');

    text = `<p>${text}</p>`;

    return text;
};
