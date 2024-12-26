import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,

} from "@nextui-org/react";
import React, { useCallback } from "react";
import { Formik } from "formik";
import { RegisterFormType } from "@/helpers/types";
import { RegisterSchema } from "@/helpers/schemas";
import { toast, ToastContainer } from "react-toastify";
import { useUsers } from "../hooks/useUsers";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isError, addUser } = useUsers();
  
  const initialValues: any = {
      name: "",
      email: "",
      password: "",
      role: "admin"
    };

    const [selectedKeys, setSelectedKeys] = React.useState(new Set([initialValues?.role]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

    const notify = () => toast.error('failed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const notifySuccess = () => toast.success('User Added!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
  
    const handleRegister = useCallback(
      async (values: RegisterFormType) => {
        try {
          const res = await addUser.mutateAsync({
            username: values.name,
            email: values.email,
            password: values.password,
            role: values.role!,
          });
          if(isError){
            notify()
            console.error('Registration failed');
          }else{
            notifySuccess();
          }
    
        } catch (error) {
          console.error('Error during registration:', error);
        }
      },
      []
    );


  return (
    <div>
   
        <Button onPress={onOpen} color="primary">
          Add User
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add User
                </ModalHeader>
                <ModalBody>
              
  <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}>
        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
  
            <div className='flex flex-col w gap-4 mb-4'>
              <Input
                variant='bordered'
                label='username'
                value={values.name}
                isInvalid={!!errors.name && !!touched.name}
                errorMessage={errors.name}
                onChange={handleChange("name")}
              />
              <Input
                variant='bordered'
                label='Email'
                type='email'
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant='bordered'
                label='Password'
                type='password'
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
              <Input
                variant='bordered'
                label='Confirm password'
                type='password'
                value={values.confirmPassword}
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
             
             <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys as any}
      >
        <DropdownItem key="admin">Admin</DropdownItem>
        <DropdownItem key="user">User</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <ModalFooter>
    <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>

                  <Button color="primary" variant="flat" onPress={() => {
                    handleSubmit(); 
                    onClose(); 
                  }}>
                    Add User
                  </Button>
                  
                </ModalFooter>

    
            </div>

    
        )}
         
      </Formik>


                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
    </div>
  );
};