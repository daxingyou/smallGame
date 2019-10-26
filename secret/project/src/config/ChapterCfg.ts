class ChapterCfg {
    /**章 */
	public chapter:number;
    /**图片 */
    public pic:number;
    /**名字 */
    public name:string;
    /**结束文 */
    public endWord:string;
    /**结局 */
    public ending:boolean;
    /**内容 
     * progress 进度
     * box 忽略
     * center 忽略
     * artical 显示内容
     * prompt 提示
     * correct 结束内容
    */
    public cnt:{progress:number,box:string,center:string,artical:string,prompt:string,correct:string}[]
}