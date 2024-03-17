"use client";
import Image from "next/image";
import { Paytone_One } from "next/font/google";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
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

const Paytone = Paytone_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

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
        setTimeout(() => setElapsedTime(0), 10); // Delay by 10 milliseconds
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div>
      <div className="p-12 text-5xl text-gray-300">
        <div className={Paytone.className}>Productivity App</div>
      </div>
      <div className="mt-8 px-12 w-full">
        <Table
          aria-label="Example static collection table"
          className="w-1/2 max-sm:w-full"
        >
          <TableHeader>
            <TableColumn>COMPLETION</TableColumn>
            <TableColumn>TASK</TableColumn>
            <TableColumn>TIMER</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <Checkbox></Checkbox>
              </TableCell>
              <TableCell>Do maths</TableCell>
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
            </TableRow>
          </TableBody>
        </Table>
        <Card className="my-8 w-1/2 max-sm:w-full">
          <CardBody className="text-red inline-flex">
            <div>
              Alert: The Timer is going to reset when you exit the fullscreen
              mode
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
