"use client";
import Image from "next/image";
import { Paytone_One } from "next/font/google";
import { supabase } from "./client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
} from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

import { Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Open_Sans } from "next/font/google";
import { MdDeleteOutline } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
const opensans = Open_Sans({ weight: "300", subsets: ["latin"] });
const Paytone = Paytone_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [checkedStatus, setCheckedStatus] = useState(false);
  useEffect(() => {
    let intervalId: number | null = null;
    if (isRunning) {
      intervalId = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (document.fullscreenElement) {
      setIsRunning(true);
    } else {
      document.documentElement.requestFullscreen();
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };
  const formattedTime = new Date(elapsedTime).toISOString().slice(-13, -5); // HH:MM:SS format
  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        console.log("Entered fullscreen mode");
      } else {
        console.log("Exited fullscreen mode");
        setIsRunning(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  interface Task {
    id: string;
    taskName: string;
    status: string;
  }
  const [taskStored, setTaskStored] = useState<Task[]>([]);
  if (taskStored) {
  }
  async function getData() {
    const { data: tasks } = await supabase.from("tasks").select();
    if (tasks) {
      setTaskStored(tasks);
      console.log("tasks found");
    } else {
      console.log("task not found");
    }
  }
  getData();
  const [taskValue, setTaskValue] = useState("");
  async function sendData() {
    const { error } = await supabase
      .from("tasks")
      .insert({ taskName: taskValue });
  }
  const [editedTaskName, setEditedTaskName] = useState("");

  return (
    <div>
      <div className={opensans.className}>
        <Navbar>
          <NavbarBrand>
            <p className=" text-inherit">Productivity App</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                About
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      <div className="px-48 max-sm:p-0 px-auto my-20 max-md:p-0 max-lg:p-0">
        <div className="mx-12 my-8">
          <Popover placement="right" showArrow offset={10}>
            <PopoverTrigger>
              <Button color="primary">Create new Task</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              {(titleProps) => (
                <div className="px-1 py-2 w-full">
                  <p
                    className="text-small font-bold text-foreground"
                    {...titleProps}
                  >
                    Create New Task
                  </p>
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    <Input
                      size="sm"
                      variant="bordered"
                      value={taskValue}
                      onValueChange={setTaskValue}
                    />

                    <Button variant="flat" color="secondary" onPress={sendData}>
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-8 px-12 w-full">
          <Table
            aria-label="Example static collection table"
            className="w-full max-sm:w-full"
          >
            <TableHeader>
              <TableColumn>COMPLETION</TableColumn>
              <TableColumn>TASK</TableColumn>
              <TableColumn>TIMER</TableColumn>
              <TableColumn>EDIT</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Tasks to display."}>
              {taskStored.map((task) => (
                <TableRow key="1">
                  <TableCell>
                    <Checkbox
                      onValueChange={() => {
                        const deleteData = async () => {
                          const { error } = await supabase
                            .from("tasks")
                            .delete()
                            .eq("taskName", task.taskName);
                          console.log(task.taskName, "deleated");
                        };
                        deleteData();
                      }}
                    ></Checkbox>{" "}
                    <Chip color="secondary" variant="flat">
                      {task.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="flat"
                      onPress={onOpen}
                      onClick={toggleFullScreen}
                    >
                      Start
                    </Button>

                    <Modal
                      isOpen={isOpen}
                      onOpenChange={onOpenChange}
                      isDismissable={false}
                      isKeyboardDismissDisabled={true}
                      classNames={{
                        backdrop:
                          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                      }}
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              Stopwatch
                            </ModalHeader>
                            <ModalBody>
                              <div className="items-center flex justify-center w-full flex-col gap-8 p-12">
                                <div className="text-7xl">{formattedTime}</div>
                                <div className="inline-flex gap-6">
                                  <Button
                                    onClick={handleStart}
                                    disabled={isRunning}
                                    variant="flat"
                                    color="success"
                                  >
                                    Start
                                  </Button>
                                  <Button
                                    onClick={handleStop}
                                    disabled={!isRunning}
                                    variant="flat"
                                    color="danger"
                                  >
                                    Stop
                                  </Button>
                                  <Button onClick={handleReset}>Reset</Button>
                                </div>
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                                className="mt-6"
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="faded"
                      aria-label="Take a photo"
                      onClick={() => {
                        async function deleteItem() {
                          const { error } = await supabase
                            .from("tasks")
                            .delete()
                            .eq("taskName", task.taskName);
                        }
                        deleteItem();
                      }}
                    >
                      <MdDeleteOutline size={18} />
                    </Button>
                    <Popover placement="right" showArrow offset={10}>
                      <PopoverTrigger>
                        <Button
                          isIconOnly
                          color="warning"
                          variant="faded"
                          aria-label="Take a photo"
                          className="mx-6"
                        >
                          <HiOutlinePencil size={18} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px]">
                        {(titleProps) => (
                          <div className="px-1 py-2 w-full">
                            <p
                              className="text-small font-bold text-foreground"
                              {...titleProps}
                            >
                              Edit Task
                            </p>
                            <div className="mt-2 flex flex-col gap-2 w-full">
                              <Input
                                size="sm"
                                variant="bordered"
                                value={editedTaskName}
                                onValueChange={setEditedTaskName}
                              />

                              <Button
                                variant="flat"
                                color="secondary"
                                onClick={() => {
                                  async function setChangedTask() {
                                    const { error } = await supabase
                                      .from("tasks")
                                      .update({ taskName: editedTaskName })
                                      .eq("taskName", task.taskName);
                                  }
                                  setChangedTask();
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Card className="my-8 w-full max-sm:w-full">
            <CardBody className="text-red inline-flex">
              <div>
                Alert: The Timer is going to reset when you exit the fullscreen
                mode
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
