import React from 'react';
import classNames from 'classnames';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className='flex justify-center mt-16'>
			<button
				onClick={handlePrevPage}
				className={classNames('w-10', 'h-10', 'rounded-3xl', 'border-2', 'hover:bg-gray-200', {
					'bg-gray-200 text-white': currentPage === 1,
				})}
			>
				{'<'}
			</button>
			<div>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						onClick={() => onPageChange(index + 1)}
						className={classNames('w-10', 'h-10', 'border-2', 'mx-1', 'rounded-3xl', 'hover:bg-green-200', {
							'bg-green-500 ': index + 1 === currentPage,
						})}
						key={index}
					>
						{index + 1}
					</button>
				))}
			</div>
			<button
				onClick={handleNextPage}
				className={classNames('w-10', 'h-10', 'rounded-3xl', 'border-2', 'hover:bg-gray-200', {
					'bg-gray-200 text-white': currentPage === totalPages,
				})}
			>
				{'>'}
			</button>
		</div>
	);
};

export default Pagination;
