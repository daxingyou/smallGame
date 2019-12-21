/**
 * Page array
 * @author Peach.T 2010-5-3
 */

class PageArray {

	/**
	 * Quantity per page
	 */
	private size: number;

	/**
	 * Current page
	 */
	public currentPage: number;

	/**
	 * External data interface
	 */
	public pageData: Array<any>;

	/**
	 * data source
	 */
	private dataSource: Array<any>;

	public constructor(source: Array<any>, size: number = 20) {

		this.dataSource = source;
		this.size = size;
		this.currentPage = 0;
		this.setPageData();
	}

	/**
	 *Data source length
	 */
	public get length(): number {
		return this.dataSource.length;
	}

	/**
	 * set up data sources
	 *
	 */
	public setPageData(): void {
		this.pageData = [];
		let index: number = this.currentPage * this.size;
		let nextIndex: number = (this.currentPage + 1) * this.size;
		let min: number = Math.min(this.length, nextIndex);
		for (let i: number = index; i < min; i++) {
			this.pageData.push(this.dataSource[i]);
		}
	}

	public getDataSource(): Array<any> {
		return this.dataSource;
	}

	public get totalPage(): number {
		return Math.ceil(this.length / this.size);
	}

	/**
	 * Is there a previous page
	 * @return
	 *
	 */
	public havePre(): boolean {
		return this.currentPage != 0; //no data，Or just one page，Or in the case of multiple pages on the first page
	}

	/**
	 * Is there a next page
	 * @return
	 *
	 */
	public haveNext(): boolean {
		return this.currentPage < this.totalPage - 1;//no data ，Or on the last page
	}

	/**
	 * Flip pages forward
	 *
	 */
	public prev(): void {
		this.currentPage--;
		this.setPageData();
	}

	/**
	 * Flip pages back
	 *
	 */
	public next(): void {
		this.currentPage++;
		this.setPageData();
	}

	/**
	 * home page
	 *
	 */
	public first(): void {
		this.currentPage = 0;
		this.setPageData();
	}

	/**
	 * Last
	 *
	 */
	public last(): void {
		this.currentPage = this.totalPage - 1;
		this.setPageData();
	}

	/**
	 * How many pages to jump to
	 * @param index The number of pages
	 *
	 */
	public gotoPage(index: number): void {
		if (this.totalPage < index) //There are not so many pages
		{
			return;
		}
		else {
			this.currentPage = index - 1;
			this.setPageData();
		}
	}
}
