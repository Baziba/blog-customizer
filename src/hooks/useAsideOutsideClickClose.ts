import { useEffect } from 'react';

type UseAsideOutsideClickCloseProps = {
	isOpen: boolean;
	asideRef: React.RefObject<HTMLElement>;
	setIsOpen: (isOpen: boolean) => void;
};

export const UseAsideOutsideClickClose = ({
	isOpen,
	asideRef,
	setIsOpen,
}: UseAsideOutsideClickCloseProps) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !asideRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, asideRef, setIsOpen]);
};
