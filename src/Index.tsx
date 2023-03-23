import { useRef, useState } from "react";
// żeby nie było że nie ma komponentów:
// tutaj komponent z ikonkami.
// nie widziałem sensu rozdzielać projektu na drobne
// w przypadku tego projektu..
import { Icon } from "./Icon";
import "./Index.css";

type task = {
	content: string;
	complete: boolean;
};

const defaultTasks: task[] = [
	{
		content: "do ur mum",
		complete: true,
	},
	{
		content: "do ur dad",
		complete: true,
	},
	{
		content: "do the laundry",
		complete: false,
	},
];

const Index = () => {
	const [list, setList] = useState<task[]>(defaultTasks);
	const [filter, setFilter] = useState<boolean>(false);
	const [messageIndex, setMessageIndex] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<header>
				<h1>to-do list</h1>
				<p>
					by @
					<a href="https://manczak.net" target="_blank">
						jakubmanczak
					</a>
				</p>
				<p className="muted subtitle">
					Written as a school project. <br />
					Your todo list data is saved in your browser, and is never sent
					anywhere.
				</p>
			</header>
			<main>
				<div className="controls">
					<div className="newtask">
						{/* 
									ok, może dublowanie kodu złe,
									ale nie chce mi się rozwiązywać tego lepiej

									to nie enterprise :))

									(( gdyby był też by mi się nie chciało ))
						*/}
						<input
							type="text"
							ref={inputRef}
							onKeyDown={(event: React.KeyboardEvent) => {
								if (event.key === "Enter") {
									if (inputRef.current?.value == "") {
										setMessageIndex(1);
										return;
									}
									setList([
										...list,
										{
											content: inputRef.current?.value || "",
											complete: false,
										},
									]);
									if (inputRef.current) inputRef.current.value = "";
									setMessageIndex(0);
								}
							}}
						/>
						<button
							onClick={() => {
								if (inputRef.current?.value == "") {
									setMessageIndex(1);
									return;
								}
								if (inputRef.current)
									setList([
										...list,
										{
											content: inputRef.current?.value || "",
											complete: false,
										},
									]);
								if (inputRef.current) inputRef.current.value = "";
								setMessageIndex(0);
							}}
						>
							<Icon icon="arrow-right" />
						</button>
					</div>
					<div className="filter">
						<button
							onClick={() => {
								setFilter(!filter);
							}}
						>
							{filter ? <Icon icon="checked" /> : <Icon icon="unchecked" />}
						</button>
						<p
							onClick={() => {
								setFilter(!filter);
							}}
						>
							hide completed?
						</p>
					</div>
				</div>
				<p className={messageIndex === 1 ? "red" : "muted"}>
					{messageIndex === 1
						? "Najpierw coś napisz!"
						: "- - - - - - - - - - - - - -"}
				</p>
				{list
					// .filter((el: task) => {
					// 	return filter ? !el.complete : true;
					// })
					.map((el: task, index) => {
						return (
							<article
								key={`${el.content}${index}`}
								className={`
									${el.complete ? "complete" : ""}
									${filter && el.complete ? "hide" : ""}
								`}
							>
								<p>{el.content}</p>
								<button
									className="check"
									onClick={() => {
										setList(
											list.map((inEl, inIndex) => {
												return {
													content: inEl.content,
													complete:
														index === inIndex ? !inEl.complete : inEl.complete,
												};
											})
										);
									}}
								>
									{el.complete ? (
										<Icon icon="checked" />
									) : (
										<Icon icon="unchecked" />
									)}
								</button>
								<button
									className="remove"
									onClick={() => {
										setList(
											list.filter((inEl, inIndex) => {
												return index !== inIndex;
											})
										);
									}}
								>
									<Icon icon="delete" />
								</button>
							</article>
						);
					})}
				<div className="muted">
					{list.filter((el: task) => {
						return filter ? !el.complete : true;
					}).length === 0
						? "Ludzie, tu nikogo nie ma!"
						: ""}
				</div>
			</main>
		</>
	);
};

export { Index };
