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
import z from "zod";
import bcrypt from "bcryptjs";
import axios from "axios";

type AuthModalProps = {
    mode: string;
};

export interface RegisterValues {
    loginEmail: string;
    loginPassword: string;
    name: string;
    email: string;
    password: string;
    repPassword: string;
}

export interface RegisterErrors {
    loginEmail: string;
    loginPassword: string;
    name: string;
    email: string;
    password: string;
    repPassword: string;
}

const b_rounds = 10;

const schema = z
    .object({
        loginEmail: z.string().min(1).email("Must be and email"),
        loginPassword: z.string().min(1),
        name: z.string().min(1),
        email: z.string().min(1).email().email("Must be and email"),
        password: z.string().min(1),
        repPassword: z.string().min(1),
    })
    .refine((data) => data.password === data.repPassword, {
        message: "match-pass-error",
        path: ["repPassword"], // set the path of the error
    });

export default function AuthModal({ mode = "login" }: AuthModalProps) {
    const { data: session } = useSession();
    const user = session?.user;

    const t = useTranslations("auth");
    const { handleWarehouseChange } = useBeerStore();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selected, setSelected] = React.useState<any>(mode);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const [values, setValues] = React.useState<RegisterValues>({
        loginEmail: "",
        loginPassword: "",
        name: "",
        email: "",
        password: "",
        repPassword: "",
    });

    const [errors, setErrors] = React.useState<RegisterErrors>({
        loginEmail: "",
        loginPassword: "",
        name: "",
        email: "",
        password: "",
        repPassword: "",
    });

    const handleRegisterChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        optionalName?: string
    ) => {
        if (optionalName) {
            setValues({ ...values, [optionalName]: e.target.value });
        } else setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        setIsLoading(true);

        const result = schema.safeParse(values);
        if (!result.success) {
            if (result.error.formErrors.fieldErrors.repPassword) {
                setErrorMessage(
                    t(result.error.formErrors.fieldErrors.repPassword[0])
                );

                setTimeout(() => {
                    setErrorMessage("");
                }, 4000);
            }

            //@ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            setIsLoading(false);
            return;
        }

        const b_salt = await bcrypt.genSalt(b_rounds);
        const hashedPassword = await bcrypt.hash(values.password, b_salt);

        const {
            data: { record, error, status },
        } = await axios.post("/api/user", {
            name: values.name,
            email: values.email,
            password: hashedPassword,
        });

        if (error) {
            if (status === 409) {
                setErrorMessage(t("already-exists"));
            } else {
                setErrorMessage(t("user-error"));

                setTimeout(() => {
                    setErrorMessage("");
                }, 4000);
            }

            setIsLoading(false);
            return;
        }

        if (record) {
            handleLogin(values.email, values.password);
            enqueueSnackbar(t("user-created"), { variant: "success" });
        }

        setIsLoading(false);
    };

    const handleLogin = async (email = "", password = "") => {
        setIsLoading(true);

        const response = await signIn("credentials", {
            redirect: false,
            username: email ? email : values.loginEmail,
            password: password ? password : values.loginPassword,
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
                                                    name="loginEmail"
                                                    value={values.loginEmail}
                                                    color={
                                                        errors.name
                                                            ? "danger"
                                                            : "default"
                                                    }
                                                    errorMessage={
                                                        errors.name &&
                                                        "Please enter a valid email"
                                                    }
                                                    onChange={
                                                        handleRegisterChange
                                                    }
                                                    isRequired
                                                    label={t("email")}
                                                    placeholder={t(
                                                        "enter-email"
                                                    )}
                                                    type="email"
                                                />
                                                <Input
                                                    name="loginPassword"
                                                    value={values.loginPassword}
                                                    color={
                                                        errors.name
                                                            ? "danger"
                                                            : "default"
                                                    }
                                                    errorMessage={
                                                        errors.name &&
                                                        "Please enter a valid password"
                                                    }
                                                    onChange={
                                                        handleRegisterChange
                                                    }
                                                    isRequired
                                                    label={t("password")}
                                                    placeholder={t(
                                                        "enter-password"
                                                    )}
                                                    type="password"
                                                />

                                                <p className="text-center text-small">
                                                    {t("no-account")}{" "}
                                                    <Link
                                                        size="sm"
                                                        className="cursor-pointer"
                                                        onPress={() =>
                                                            setSelected(
                                                                "sign-up"
                                                            )
                                                        }
                                                    >
                                                        {t("signup")}
                                                    </Link>
                                                </p>

                                                <div className="flex gap-2 justify-end">
                                                    <Button
                                                        onPress={() =>
                                                            handleLogin()
                                                        }
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

                                        <Tab
                                            disabled={true}
                                            key="sign-up"
                                            title={t("signup")}
                                        >
                                            <form className="flex flex-col gap-4 ">
                                                <Input
                                                    name="name"
                                                    label={t("name")}
                                                    value={values.name}
                                                    color={
                                                        errors.name
                                                            ? "danger"
                                                            : "default"
                                                    }
                                                    errorMessage={
                                                        errors.name &&
                                                        "Please enter a valid name"
                                                    }
                                                    onChange={
                                                        handleRegisterChange
                                                    }
                                                    isRequired
                                                    placeholder={t(
                                                        "enter-name"
                                                    )}
                                                />

                                                <Input
                                                    name="email"
                                                    value={values.email}
                                                    color={
                                                        errors.email
                                                            ? "danger"
                                                            : "default"
                                                    }
                                                    errorMessage={
                                                        errors.email &&
                                                        "Please enter a valid email"
                                                    }
                                                    onChange={
                                                        handleRegisterChange
                                                    }
                                                    isRequired
                                                    label={t("email")}
                                                    placeholder={t(
                                                        "enter-email"
                                                    )}
                                                    type="email"
                                                />
                                                <Input
                                                    name="password"
                                                    value={values.password}
                                                    color={
                                                        errors.password
                                                            ? "danger"
                                                            : "default"
                                                    }
                                                    errorMessage={
                                                        errors.password &&
                                                        "Please enter a valid password"
                                                    }
                                                    onChange={
                                                        handleRegisterChange
                                                    }
                                                    isRequired
                                                    label={t("password")}
                                                    placeholder={t(
                                                        "enter-password"
                                                    )}
                                                    type="password"
                                                />

                                                <Input
                                                    name="repPassword"
                                                    value={values.repPassword}
                                                    color={
                                                        errors.repPassword
                                                            ? "danger"
                                                            : "default"
                                                    }
                                                    errorMessage={
                                                        errors.repPassword &&
                                                        "Please enter a valid password"
                                                    }
                                                    onChange={
                                                        handleRegisterChange
                                                    }
                                                    isRequired
                                                    label={t("rep-password")}
                                                    type="password"
                                                />

                                                <p className="text-center text-small">
                                                    {t("with-account")}{" "}
                                                    <Link
                                                        size="sm"
                                                        className="cursor-pointer"
                                                        onPress={() =>
                                                            setSelected("login")
                                                        }
                                                    >
                                                        {t("login")}
                                                    </Link>
                                                </p>

                                                <div className="flex gap-2 justify-end">
                                                    <Button
                                                        onPress={handleRegister}
                                                        fullWidth
                                                        color="primary"
                                                    >
                                                        {isLoading ? (
                                                            <div>
                                                                <Spinner />
                                                            </div>
                                                        ) : (
                                                            t("signup")
                                                        )}
                                                    </Button>
                                                </div>

                                                {errorMessage && (
                                                    <div className="mt-4 p-2 bg-error rounded-lg text-white ">
                                                        <span>
                                                            {errorMessage}
                                                        </span>
                                                    </div>
                                                )}
                                            </form>
                                        </Tab>
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
