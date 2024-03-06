"use client";

import React from "react";

import { getSession, signIn, useSession } from "next-auth/react";

import {
    Button,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
    useDisclosure,
} from "@nextui-org/react";

import Spinner from "@/components/Loaders/Spinner";
import { useTranslations } from "next-intl";
import { useBeerStore } from "@/store/zustand";
import { enqueueSnackbar } from "notistack";

type AuthModalProps = {
    mode: string;
};

export default function AuthModal({ mode = "login" }: AuthModalProps) {
    const { data: session } = useSession();
    const user = session?.user;

    const t = useTranslations("auth");
    const { handleWarehouseChange } = useBeerStore();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selected, setSelected] = React.useState<any>(mode);

    const [loginEmail, setLoginEmail] = React.useState<string>("");
    const [loginPassword, setLoginPassword] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const handleLogin = async () => {
        setIsLoading(true);
        const response = await signIn("credentials", {
            redirect: false,
            username: loginEmail,
            password: loginPassword,
        });

        if (response && response.ok) {
            onOpenChange();

            const actualSession = await getSession();
            handleWarehouseChange(actualSession?.user.name);
        } else {
            setErrorMessage(t("bad-user"));

            setTimeout(() => {
                setErrorMessage("");
            }, 4000);
        }

        setIsLoading(false);
    };

    return (
        <>
            {mode === "login" && (
                <Button
                    fullWidth={true}
                    onPress={onOpen}
                    color="primary"
                    variant="flat"
                    aria-label={t("login")}
                >
                    {t("login")}
                </Button>
            )}

            {mode === "register" && (
                <Button
                    fullWidth={true}
                    onPress={onOpen}
                    color="primary"
                    variant="flat"
                    aria-label={t("signup")}
                >
                    {t("signup")}
                </Button>
            )}

            {mode === "mobile-login" && (
                <Button
                    onPress={onOpen}
                    className="text-xl p-0 rounded-md"
                    style={{
                        width: "max-content",
                        height: "max-content",
                        justifyContent: "left",
                    }}
                    color="primary"
                    variant="light"
                    aria-label={t("login")}
                >
                    {t("login")}
                </Button>
            )}

            {mode === "mobile-register" && (
                <Button
                    onPress={onOpen}
                    className="text-xl p-0 rounded-md"
                    style={{
                        width: "max-content",
                        height: "max-content",
                        justifyContent: "left",
                    }}
                    color="primary"
                    variant="light"
                    aria-label={t("signup")}
                >
                    {t("signup")}
                </Button>
            )}

            <Modal
                classNames={{ backdrop: "z-[100000]", wrapper: "z-[1000000]" }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {t("auth")}
                            </ModalHeader>
                            <ModalBody>
                                <div className="p-2 overflow-hidden">
                                    <Tabs
                                        fullWidth
                                        size="md"
                                        aria-label={t("tabs-aria")}
                                        selectedKey={selected}
                                        onSelectionChange={setSelected}
                                    >
                                        <Tab key="login" title={t("login")}>
                                            <form className="flex flex-col gap-4">
                                                <Input
                                                    value={loginEmail}
                                                    onValueChange={
                                                        setLoginEmail
                                                    }
                                                    isRequired
                                                    label={t("email")}
                                                    placeholder={t(
                                                        "enter-email"
                                                    )}
                                                    type="email"
                                                />
                                                <Input
                                                    isRequired
                                                    label={t("password")}
                                                    placeholder={t(
                                                        "enter-password"
                                                    )}
                                                    type="password"
                                                    onValueChange={
                                                        setLoginPassword
                                                    }
                                                    value={loginPassword}
                                                />

                                                {/*<p className="text-center text-small">*/}
                                                {/*    {t('no-account')}{" "}*/}
                                                {/*    <Link size="sm" onPress={() => setSelected("sign-up")}>*/}
                                                {/*        {t('signup')}*/}
                                                {/*    </Link>*/}
                                                {/*</p>*/}

                                                <div className="flex gap-2 justify-end">
                                                    <Button
                                                        onPress={handleLogin}
                                                        fullWidth
                                                        color="primary"
                                                    >
                                                        {isLoading ? (
                                                            <div>
                                                                <Spinner />
                                                            </div>
                                                        ) : (
                                                            t("login")
                                                        )}
                                                    </Button>
                                                </div>
                                            </form>

                                            {errorMessage && (
                                                <div className="mt-4 p-2 bg-error rounded-lg text-white ">
                                                    <span>{errorMessage}</span>
                                                </div>
                                            )}
                                        </Tab>

                                        {/*<Tab disabled={true} key="sign-up" title={t('signup')}>*/}
                                        {/*    <form className="flex flex-col gap-4 h-[300px]">*/}
                                        {/*        <Input isRequired label={t('name')} placeholder={t('enter-name')}*/}
                                        {/*               type="password"*/}
                                        {/*        />*/}
                                        {/*        <Input isRequired label={t('email')} placeholder={t('enter-email')}*/}
                                        {/*               type="email"*/}
                                        {/*        />*/}
                                        {/*        <Input*/}
                                        {/*            isRequired*/}
                                        {/*            label={t('password')}*/}
                                        {/*            placeholder={t('enter-password')}*/}
                                        {/*            type="password"*/}
                                        {/*        />*/}
                                        {/*        <p className="text-center text-small">*/}
                                        {/*            {t('with-account')}{" "}*/}
                                        {/*            <Link size="sm" onPress={() => setSelected("login")}>*/}
                                        {/*                {t('login')}*/}
                                        {/*            </Link>*/}
                                        {/*        </p>*/}
                                        {/*        <div className="flex gap-2 justify-end">*/}
                                        {/*            <Button fullWidth color="primary">*/}
                                        {/*                {isLoading ?*/}
                                        {/*                    <div><Spinner/>*/}
                                        {/*                    </div> : t('signup')}*/}
                                        {/*            </Button>*/}
                                        {/*        </div>*/}
                                        {/*    </form>*/}
                                        {/*</Tab>*/}
                                    </Tabs>
                                </div>
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
