import { useEffect } from 'react';

type UseAsideOutsideClickCloseProps = {
	asideRef: React.RefObject<HTMLElement>;
	isMenuOpen: boolean;
	setIsMenuOpen: (isOpen: boolean) => void;
};

export const UseAsideOutsideClickClose = ({
	asideRef,
	isMenuOpen,
	setIsMenuOpen,
}: UseAsideOutsideClickCloseProps) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !asideRef.current?.contains(target)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen, asideRef, setIsMenuOpen]);
};
