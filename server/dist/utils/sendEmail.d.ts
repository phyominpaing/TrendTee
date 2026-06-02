interface Options {
    receiver_mail: string;
    subject: string;
    body: string;
}
export declare const sendEmail: ({ receiver_mail, subject, body }: Options) => Promise<void>;
export {};
//# sourceMappingURL=sendEmail.d.ts.map