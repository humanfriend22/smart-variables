const parseJSON = (str: string | null) => {
	if (!str) return false;

	try {
		return JSON.parse(str!);
	} catch (err) {
		return false;
	};
};

/**
 * 
 * @type {S} Data schema
 * @param name key to store and retrieve data from localStorage or sessionStorage
 * @param fallback Data for initial fallback
 * @returns A Proxy with identical data
 */
export function createStorageVariable<S>(name: string, fallback: S | null, type: 'local' | 'session'): S {
	const storage = type === 'session' ? window.sessionStorage : window.localStorage;

	return new Proxy(
		parseJSON(
			storage.getItem(name)
		) || Object(fallback),
		{
			get: (record, key) => record[key] || null,
			set: (record, key, value) => {
				record[key] = value;
				storage.setItem(name, JSON.stringify(record));
				return true;
			}
		});
};

type ElementVariable<E> = E & { [key: string | symbol]: any, selector: string };
/**
 * 
 * @param selector passed into document.querySelector
 * @returns A Proxy with the element
 */
export const createElementVariable = <T = HTMLElement>(selector: string): ElementVariable<T> => {
	let element: ElementVariable<T> | null;

	return new Proxy({ selector }, {
		get(_element, key) {
			if (!element) element = document.querySelector(selector) as ElementVariable<T> | null;
			return !!element ? element[key] : undefined;
		},
		set(_element, key, value) {
			if (!element) return false;
			// @ts-ignore
			element[key] = value;
			return true;
		}
	}) as ElementVariable<T>;
};

/**
 * Refresh the value of an Element Variable
 * @param ev Reference to existing element variable
 * @returns A new refreshed element variable
 */
export const refresh = <T = HTMLElement>(ev: ElementVariable<T>) => ev = createElementVariable(ev.selector);