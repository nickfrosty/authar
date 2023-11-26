/**
 * Create a standard URL slug for the given `input`
 */
export function createStandardSlug(input: string) {
  const splitter: string | string[] = input.toLowerCase().split("/");
  return splitter[splitter.length - 1].split(".md")[0].replace(/\s+/g, "-");
}

/**
 * Generate a random number within the provided range
 */
export function randomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

type ComputePaginationProps = {
  page?: number | string;
  take?: number | string;
  totalItems: number;
  minTake?: number;
  minPage?: number;
};

export function computePagination({
  page = 1,
  take = 3,
  totalItems,
  minTake = 9,
  minPage = 1,
}: ComputePaginationProps) {
  // convert each of the params into numbers
  if (typeof page == "string") page = parseFloat(page);
  if (typeof take == "string") take = parseFloat(take);
  if (typeof totalItems == "string") totalItems = parseFloat(totalItems);

  /** never allow the `page` to be less than `minPage` */
  page = Math.max(minPage, page);
  /** never allow the `take` to be less than `minTake` */
  take = Math.min(minTake, take);

  const data = {
    page,
    take,
    /** the starting index of the first record to display */
    startIndex: Math.max(0, page - 1) * take,
    /***/
    next: Math.min(page + 1, Math.ceil(totalItems / take)),
    /** prev */
    prev: Math.max(1, page - 1),
    /***/
    totalPages: Math.ceil(totalItems / take),
  };

  return data;
}

/**
 *
 */
export function debounce<F extends (...params: any[]) => void>(
  fn: F,
  delay: number,
) {
  let timeoutID: number | undefined;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

/**
 * Simple checker to see if a url is valid or not
 *
 * todo: in the future we should support other protocols
 * - ipfs
 * - arweave
 * - solana pay?
 */
export function isValidUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (e) {
    return false;
  }
}

/**
 * Standard number formatter
 */
export function numberFormatter(val: number) {
  return Intl.NumberFormat(undefined, {}).format(val);
}
