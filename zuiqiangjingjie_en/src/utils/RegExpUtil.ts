	/**
	 * Regularity used in the game
	 * @author WynnLam
	 *
	 */
	class RegExpUtil
	{
		//Newline character\r
		public static  LINE_BREAK:RegExp = /\r+/g;
		//White space characters and“\”Regular number
		public static  BLANK_REG:RegExp = /[\s\\]/g;
		//8positionARGBcolour
		public static  ARGB_COLOR:RegExp = /[a-fA-F0-9]{8}/;
		//htmlregular
		public static  HTML:RegExp = /<[^>]+>/g;
		//Regular expressions without spaces
		public static  DELETE_SPACE:RegExp = /\s/g; //Remove space characters

		public static  REPLACE_STRING:RegExp = /%s/g; //Remove space characters

		static NumericExp:RegExp = /^\d+$/;
		static NonNumericExp:RegExp = /\D/;
		static ActorNameExp:RegExp = /^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/;




	}

