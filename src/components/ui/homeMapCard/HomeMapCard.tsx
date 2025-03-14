import { Tooltip, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { TooltipProps } from '@mui/material/Tooltip'
import CustomTooltipContent from '../homeMapTooltip/HomeMapTooltip'
import styles from './HomeMap.module.scss'

const HtmlTooltip = (props: TooltipProps) => {
	const theme = useTheme()

	return (
		<Tooltip
			{...props}
			followCursor
			slotProps={{
				tooltip: {
					sx: {
						backgroundColor:
							theme.palette.mode === 'dark'
								? theme.palette.background.paper
								: 'white',
						color:
							theme.palette.mode === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.87)',
						maxWidth: 220,
						fontSize: '12px',
						border: `1px solid ${theme.palette.divider}`,
						boxShadow: theme.shadows[3],
					},
				},
			}}
		/>
	)
}
function HomeMapCard() {
	const theme = useTheme()
	return (
		<Box
			className={`shadow-xl rounded-xl p-2 flex items-center justify-center ${styles.map}`}
			sx={{
				border: `1px solid ${theme.palette.divider}`,
			}}
		>
			<svg
				width='300'
				height='270'
				viewBox='0 0 934 885'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g opacity='0.8'>
					<HtmlTooltip title={<CustomTooltipContent data='123' />}>
						<path
							d='M448.934 510.576C448.934 510.576 438.542 515.866 435.438 519.321C432.333 522.775 431.619 529.902 431.619 529.902C431.619 529.902 419.959 528.62 417.219 526.069C414.479 523.518 407.395 526.069 407.395 526.069C407.395 526.069 409.203 535.353 405.559 538.035C404.71 538.628 403.672 538.888 402.644 538.764C399.146 538.545 395.007 535.324 393.899 534.625C392.441 533.721 384.075 533.357 384.075 533.357C383.675 535.755 382.939 538.086 381.889 540.28C380.432 542.83 375.461 542.699 375.461 542.699L372.226 539.187L370.04 545.017C370.04 545.017 374.412 547.567 373.683 551.211C372.955 554.855 368.582 549.754 366.76 551.94C364.938 554.126 370.404 555.219 368.582 562.142C366.76 569.066 361.295 564.693 361.295 564.693C358.04 565.202 354.75 565.446 351.456 565.422C345.626 565.422 332.509 559.592 325.95 558.499C319.391 557.405 311.011 566.151 311.011 566.151L305.909 569.066V574.531C309.628 576.799 313.162 579.358 316.476 582.183C319.391 585.098 325.95 584.005 325.95 584.005C325.95 584.005 331.416 592.386 332.145 598.945C332.873 605.503 341.983 614.977 341.983 614.977L343.44 620.807C343.44 620.807 359.108 628.824 357.286 633.561C355.465 638.297 348.906 633.925 348.906 633.925C348.906 633.925 343.44 636.111 341.254 635.018C339.068 633.925 340.161 619.35 340.161 619.35L331.416 605.503L314.654 601.86L302.63 606.597C302.63 606.597 297.893 602.224 296.436 602.224C294.978 602.224 296.436 596.394 292.063 594.208C287.691 592.021 280.403 597.123 280.403 597.123L278.946 606.961C278.946 606.961 275.302 600.402 270.929 604.41C266.557 608.418 274.573 612.791 276.031 616.799C277.488 620.807 275.666 623.722 274.938 627.73C274.209 631.739 276.031 641.577 273.116 645.221C270.201 648.864 262.913 644.127 262.913 644.127L260.727 649.229C260.727 649.229 265.828 655.423 263.278 658.338C260.727 661.253 260.727 657.245 251.618 657.245C242.508 657.245 241.415 661.253 234.856 662.711C228.297 664.168 219.188 650.322 192.589 662.711C165.989 675.1 170.726 689.31 165.989 698.42C161.252 707.529 154.694 704.25 146.677 708.622C138.661 712.995 138.107 753.077 141.94 766.194C149.957 775.668 145.22 782.956 145.22 782.956L147.77 801.903L155.422 812.835C160.159 812.835 161.981 810.284 164.896 810.648C167.811 811.013 165.625 817.207 161.981 818.665C158.337 820.122 150.685 823.037 150.685 828.867C150.685 834.697 147.654 834.697 147.654 834.697C147.654 834.697 2.8656 822.556 1.4081 823.518C-0.0494016 824.48 2.8656 110.94 2.8656 110.94L363.364 1C363.874 1.45183 364.472 1.94738 365.157 2.45751C365.157 2.45751 360.784 8.09809 360.784 13.0099C360.784 17.9217 360.405 24.1307 359.137 27.7745C357.869 31.4183 350.757 40.5132 347.288 45.9934C343.819 51.4737 339.272 59.2859 337.275 67.8561C335.278 76.4263 333.267 77.8692 333.442 82.2418C333.617 86.6143 334.695 88.4362 333.442 90.2581C332.188 92.08 329.623 89.7188 328.719 92.4443C327.816 95.1699 321.053 110.474 320.878 112.31C320.703 114.147 321.432 116.304 320.878 117.761C320.324 119.219 319.056 116.493 317.788 120.866C316.52 125.238 312.308 135.63 312.497 143.822C312.687 152.013 313.59 157.668 316.331 163.134C319.071 168.599 323.239 175.523 324.347 180.813C325.023 183.432 325.142 186.163 324.697 188.83H321.782L314.684 201.568C314.684 201.568 313.226 214.875 314.684 217.426C316.662 222.061 317.892 226.981 318.327 232.001C318.327 235.281 316.87 247.669 318.327 251.678C319.785 255.686 329.259 267.71 329.259 273.905V305.241C329.259 309.614 336.182 317.63 336.182 321.638V330.019C336.182 330.019 328.166 324.553 327.072 338.035C325.979 351.517 327.801 352.246 329.987 356.619L343.44 383.597C343.44 383.597 356.193 380.318 355.1 392.342C355.1 392.342 344.169 394.164 339.796 396.35C335.424 398.537 327.043 402.18 324.857 411.29C323.571 416.572 322.598 421.926 321.942 427.322C321.942 427.322 328.865 436.432 357.651 438.983C386.436 441.533 394.453 438.983 394.453 438.983C394.453 438.983 398.461 449.185 404.291 449.914C410.121 450.643 419.959 447.363 419.959 447.363L422.51 450.016H432.712C432.712 450.016 436.356 451.546 436.356 457.304V466.136H444.78C445.538 468.191 446.238 470.13 446.748 471.616C448.38 476.514 448.934 510.576 448.934 510.576ZM390.984 16.814V28.1389C390.984 28.1389 385.533 33.6191 384.804 34.1584C384.075 34.6977 384.804 44.5505 384.804 44.5505L382.428 45.0898L381.335 49.8267L378.056 53.1061V61.4868L376.059 64.7662L375.141 81.5276C375.141 81.5276 368.043 86.2645 367.664 86.8183C367.285 87.3722 367.853 109.22 368.043 114.686C368.232 120.152 372.036 121.609 372.036 121.609L371.687 128.357C371.687 128.357 363.116 134.916 360.755 143.472C358.394 152.027 362.388 167.331 362.752 174.269C363.116 181.207 365.157 201.962 365.157 201.962L351.282 213.432H338.805C335.693 212.118 332.674 210.594 329.769 208.87C325.586 206.334 314.654 201.583 314.654 201.583L321.753 188.844H324.668C325.113 186.177 324.994 183.446 324.318 180.828C323.21 175.537 319.027 168.614 316.301 163.148C313.576 157.683 312.658 152.027 312.468 143.836C312.279 135.645 316.476 125.253 317.759 120.88C319.042 116.508 320.295 119.233 320.849 117.776C321.403 116.318 320.674 114.132 320.849 112.325C321.024 110.518 327.772 95.1845 328.69 92.4589C329.608 89.7334 332.144 92.0945 333.413 90.2727C334.681 88.4508 333.602 86.6289 333.413 82.2563C333.223 77.8838 335.249 76.4263 337.246 67.8707C339.243 59.3151 343.805 51.4591 347.259 46.008C350.713 40.5569 357.84 31.4329 359.108 27.7891C360.376 24.1453 360.755 17.9363 360.755 13.0245C360.755 8.11266 365.128 2.47209 365.128 2.47209C370.214 6.27619 380.009 11.6398 390.984 16.814Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>

					<HtmlTooltip title={<CustomTooltipContent data='123' />}>
						<path
							d='M726.588 288.304C726.588 294.134 726.398 303.608 724.022 309.089C721.647 314.569 721.107 320.924 720.932 328.036C720.758 335.149 720.379 344.608 717.653 346.794C714.928 348.981 709.272 347.887 707.451 351.167C705.629 354.446 708.179 361.18 705.804 363.92C703.428 366.66 697.787 366.106 697.787 366.106C697.787 366.106 696.884 375.026 695.426 377.402C693.969 379.778 689.961 381.41 688.503 385.418C687.046 389.427 686.127 392.342 685.952 392.895C683.533 395.243 680.399 396.715 677.047 397.079C672.835 397.268 635.494 396.16 635.494 396.16C635.494 396.16 629.474 393.07 626.37 396.16C623.265 399.25 620 405.095 617.45 405.824C614.899 406.552 608.151 405.824 608.151 405.824L602.321 404.002L585.21 408.199C585.21 408.199 579.919 418.752 575.547 419.306C571.174 419.859 562.429 417.673 562.429 417.673L556.06 424.407L546.032 428.954C546.032 428.954 545.128 421.667 542.753 422.221C540.377 422.774 540.567 427.497 540.567 427.497L535.465 426.229L534.008 428.954L530.175 430.222V436.242C525.03 430.776 521.75 433.079 518.85 434.537C518.38 434.781 517.893 434.991 517.392 435.163C514.098 436.242 505.324 436.242 505.543 435.163C507.19 427.147 502.628 425.864 502.628 425.864C502.628 425.864 498.255 425.5 493.096 424.582C487.936 423.664 481.304 423.124 477.063 424.582C473.129 425.673 469.105 426.404 465.039 426.768C465.039 426.768 464.485 429.508 462.852 436.242C462.445 438.143 461.563 439.909 460.289 441.377C459.015 442.845 457.39 443.967 455.565 444.637V449.913C449.735 449.185 442.622 451.196 441.719 453.922C441.092 455.831 442.943 461.311 444.634 466.121H436.209V457.288C436.209 451.546 432.566 450.001 432.566 450.001H422.363L419.812 447.348C419.812 447.348 409.974 450.628 404.144 449.899C398.314 449.17 394.306 438.967 394.306 438.967C394.306 438.967 386.29 441.518 357.504 438.967C328.719 436.417 321.795 427.307 321.795 427.307C322.451 421.911 323.425 416.557 324.71 411.275C326.897 402.165 335.277 398.521 339.65 396.335C344.022 394.149 355.099 392.342 355.099 392.342C356.192 380.317 343.439 383.597 343.439 383.597L329.957 356.633C327.771 352.26 325.949 351.531 327.042 338.049C328.136 324.567 336.152 330.033 336.152 330.033V321.652C336.152 317.644 329.229 309.628 329.229 305.255V273.919C329.229 267.724 319.755 255.7 318.297 251.692C316.84 247.683 318.297 235.295 318.297 232.015C317.862 226.995 316.632 222.075 314.654 217.44C313.196 214.889 314.654 201.582 314.654 201.582C314.654 201.582 325.585 206.334 329.768 208.87C332.673 210.594 335.692 212.118 338.804 213.432H351.281L365.156 201.961C365.156 201.961 363.116 181.177 362.751 174.269C362.387 167.36 358.379 152.027 360.754 143.471C363.13 134.916 371.686 128.357 371.686 128.357L372.035 121.609C372.035 121.609 368.217 120.151 368.042 114.685C367.867 109.22 367.313 87.3571 367.663 86.8178C368.013 86.2785 375.14 81.527 375.14 81.527L376.058 64.7656L378.055 61.4862V53.1055L381.334 49.8261L382.427 45.0892L384.803 44.5499C384.803 44.5499 384.074 34.6972 384.803 34.1579C385.532 33.6186 390.983 28.1384 390.983 28.1384V16.8135C401.267 21.721 411.833 26.0137 422.625 29.6687C443.526 36.4607 472.909 52.7412 479.964 59.3C487.018 65.8588 636.878 191.453 646.352 198.492C655.826 205.532 695.907 236.636 700.527 242.947C703.355 246.809 718.6 258.382 730.042 266.806C730.304 266.996 726.588 282.474 726.588 288.304Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />}>
						<path
							d='M451.938 592.298C450.828 591.137 449.574 590.123 448.207 589.281C445.292 588.013 440.365 592.925 436.168 593.479C431.97 594.033 420.864 589.281 416.681 588.013C412.498 586.745 399.919 569.43 394.454 563.425C390.489 559.052 380.607 548.296 375.506 542.699C375.506 542.699 380.476 542.83 381.933 540.28C382.984 538.086 383.719 535.755 384.12 533.356C384.12 533.356 392.486 533.721 393.943 534.624C395.066 535.324 399.205 538.545 402.688 538.764C402.688 538.764 407.425 550.307 407.775 550.847C408.125 551.386 415.791 550.482 418.896 551.765C422.001 553.047 433.806 560.131 433.806 560.131V571.441L440.365 574.706V578.175C440.365 578.175 441.823 578.175 443.834 578.481C447.303 578.947 452.317 580.055 453.483 582.722C455.246 586.774 452.156 591.934 451.938 592.298Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />}>
						<path
							d='M933 435.09C933 435.09 907.173 477.489 884.713 514.51L878.168 505.663L808.019 476.323L800.382 490.359L756.088 466.121L702.539 478.247C702.539 478.247 665.723 539.186 665.373 547.391C665.023 555.597 669.556 584.179 670.474 588.552C671.393 592.924 677.208 603.127 677.208 603.127C677.208 603.127 677.004 610.225 677.062 616.623L606.519 573.802C606.519 573.802 601.243 562.506 605.237 551.575C609.23 540.643 625.292 530.98 625.292 530.98C625.292 530.98 623.28 525.15 614.535 525.339L609.259 510.954L603.735 509.496L598.678 515.501L591.04 506.581L589.583 485.447C589.583 485.447 585.21 482.532 585.21 469.954C585.21 457.375 587.207 452.274 587.207 452.274L586.478 442.509L591.39 434.609L597.22 430.237L595.223 420.938L601.593 413.3L602.322 404.001L608.152 405.823C608.152 405.823 614.9 406.552 617.45 405.823C620.001 405.094 623.28 399.264 626.37 396.16C629.46 393.055 635.494 396.16 635.494 396.16C635.494 396.16 672.835 397.268 677.048 397.078C680.399 396.715 683.534 395.243 685.953 392.895C686.128 392.341 687.046 389.426 688.504 385.418C689.961 381.41 693.969 379.777 695.427 377.402C696.884 375.026 697.788 366.106 697.788 366.106C697.788 366.106 703.443 366.66 705.804 363.92C708.165 361.18 705.629 354.446 707.451 351.167C709.273 347.887 714.928 348.98 717.654 346.794C720.379 344.608 720.758 335.134 720.933 328.036C721.108 320.938 721.662 314.539 724.023 309.088C726.384 303.637 726.588 294.134 726.588 288.304C726.588 282.474 730.305 266.995 730.042 266.806C737.33 272.14 743.043 276.221 743.043 276.221L848.945 404.73L888.298 398.419L901.911 421.244L933 435.09Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<Tooltip title={<CustomTooltipContent data='123' />}>
						<path
							d='M650.388 677.024C648.829 679.371 647.881 681.105 647.881 681.105L642.809 691.993C642.648 691.359 642.362 690.764 641.969 690.241C641.577 689.718 641.084 689.278 640.521 688.947C637.854 687.008 634.939 691.381 630.318 691.381C625.698 691.381 625.946 684.574 623.278 684.326C620.611 684.078 623.031 686.512 622.069 688.466C621.107 690.419 619.154 687.737 616.72 688.218C614.286 688.699 617.696 690.404 616.239 693.567C614.781 696.73 613.805 694.048 611.371 694.777C608.936 695.505 610.409 697.939 607.246 698.42C604.083 698.901 605.788 694.048 602.873 693.567C599.958 693.086 600.148 697.692 599.652 700.359C599.157 703.026 605.978 705.46 601.11 710.328C598.923 711.786 599.419 708.142 596.737 707.165C594.055 706.189 585.077 715.429 585.077 715.429C582.526 711.786 574.219 712.821 569.117 705.344C568.576 704.077 567.653 703.011 566.478 702.292C565.302 701.574 563.933 701.24 562.558 701.335C560.183 701.335 558.186 698.056 557.807 694.412C557.428 690.768 566.931 693.873 569.117 690.958C571.304 688.043 565.648 682.213 565.648 682.213L565.823 674.007C565.823 674.007 565.094 673.089 562.369 669.445C559.643 665.801 561.64 662.347 565.823 662.536C570.006 662.726 571.653 662.536 572.382 658.164C573.111 653.791 565.473 651.051 561.276 649.419C560.894 649.271 560.524 649.095 560.168 648.894C560.168 648.894 559.264 637.03 565.284 634.844C571.304 632.657 579.859 637.132 590.82 634.042C597.991 637.598 608.31 639.508 615.204 643.939C622.856 648.865 626.31 665.991 629.954 672.36C633.598 678.729 650.388 677.024 650.388 677.024Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</Tooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M542.39 595.491C543.119 600.942 534.738 611.145 534.738 611.145C525.075 612.602 521.621 610.795 521.621 610.882C521.621 610.97 516.33 601.131 516.33 601.131C516.33 601.131 510.5 608.609 506.681 605.504C502.863 602.399 505.399 596.03 502.134 593.844C498.869 591.658 484.819 593.844 484.819 593.844L482.457 585.463H476.802L474.441 581.994H470.243L469.165 577.87C470.273 577.099 471.102 575.989 471.526 574.707C473.712 569.256 467.693 563.047 468.057 553.573C468.422 544.099 458.161 536.637 457.855 530.806C457.828 527.987 457.506 525.178 456.893 522.426L460.347 524.073L465.987 533.896C467.991 534.216 469.977 534.644 471.934 535.179C472.605 535.543 477.648 538.764 477.648 538.764C478.131 537.942 478.901 537.326 479.81 537.036C480.719 536.746 481.703 536.801 482.574 537.19C485.664 538.648 485.853 545.017 485.853 545.017C487.264 545.126 488.678 544.865 489.956 544.259C491.235 543.653 492.332 542.724 493.141 541.563L495.692 548.661H500.851C512.147 561.779 518.706 580.726 518.706 580.726C523.089 577.068 527.853 573.892 532.916 571.252C540.568 567.419 542.434 573.803 542.434 573.803C542.434 573.803 535.467 577.083 534.738 580.362C534.01 583.641 541.662 590.011 542.39 595.491Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M521.547 610.824L516.3 601.058C516.3 601.058 510.47 608.492 506.68 605.431C502.891 602.37 505.369 595.957 502.162 593.771C498.956 591.584 484.818 593.771 484.818 593.771L482.486 585.317H476.801L474.469 581.819H470.243L469.222 577.738C467.036 579.05 464.121 577.884 461.497 576.718C457.854 575.114 452.898 569.139 452.898 569.139L445.028 572.928L443.716 578.321C447.214 578.758 452.169 579.924 453.335 582.548C455.084 586.629 452.024 591.73 451.732 592.167C456.688 596.977 464.413 605.868 464.267 608.783C464.121 611.407 463.538 613.884 462.663 616.216C462.663 616.216 478.113 633.415 478.696 633.415C479.279 633.415 483.069 638.954 483.069 638.954L526.648 636.622C530.146 628.459 533.353 620.297 534.082 611.115C524.899 612.573 521.693 610.824 521.547 610.824Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M588.591 632.832C581.449 628.459 575.765 628.022 569.352 623.504C562.939 618.985 560.315 617.819 554.048 616.216C547.781 614.613 544.428 609.657 534.809 611.115C534.663 611.115 534.517 611.115 534.226 611.115C533.497 620.151 530.291 628.459 526.792 636.621H527.084C527.084 636.621 535.975 640.994 536.704 640.411C538.453 638.224 540.056 636.038 541.513 633.706C541.513 633.706 551.279 636.621 552.59 639.973C554.048 643.763 556.817 646.824 560.17 648.864C560.17 648.864 559.295 637.058 565.271 634.872C571.247 632.686 579.846 637.204 590.777 634.143C590.049 633.706 589.32 633.269 588.591 632.832Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M798.181 610.415C799.814 612.791 800.003 620.078 800.368 628.823C800.732 637.568 792.176 649.228 781.784 659.621C771.392 670.013 773.957 670.902 772.311 673.467C770.664 676.032 729.314 674.371 724.213 675.828C719.111 677.286 716.925 688.946 716.925 688.946C716.925 688.946 714.199 683.844 710.366 683.291C706.533 682.737 700.353 693.318 700.353 693.318C700.353 693.318 693.066 692.764 691.054 693.318C689.043 693.872 688.504 700.431 691.054 704.25C693.605 708.068 692.876 706.8 701.082 707.718C709.288 708.637 705.265 716.638 701.621 721.565C697.977 726.491 699.245 733.225 701.621 735.411C703.997 737.597 706.912 730.849 709.273 731.388C711.634 731.928 708.544 737.219 709.273 739.959C710.002 742.699 715.482 750.715 715.482 750.715C715.055 751.565 714.802 752.492 714.739 753.441C714.374 760.364 727.492 775.303 727.856 778.218C728.061 780.4 728.061 782.596 727.856 784.777C727.856 784.777 723.119 785.142 721.298 786.963C719.461 789.02 717.739 791.175 716.138 793.42C715.686 791.829 714.923 790.342 713.893 789.048C712.188 787.095 710.483 791.234 708.063 791.234C705.644 791.234 705.877 787.823 701.986 784.427C698.094 781.031 694.946 781.993 692.512 780.536C690.078 779.078 692.264 775.435 688.62 770.1C684.976 764.766 681.099 768.876 678.665 766.689C676.231 764.503 679.875 759.65 678.665 757.216C677.456 754.782 674.774 757.216 670.401 754.301C666.029 751.386 670.401 747.99 666.276 740.454C662.152 732.919 654.441 738.691 652.736 734.624C651.031 730.558 653.407 730.806 653.64 727.337C653.873 723.868 652.678 724.669 650.492 723.693C648.305 722.716 649.034 720.778 646.119 715.924C643.204 711.071 645.623 709.613 644.662 706.203C643.698 703.222 643.207 700.109 643.204 696.977C643.189 695.313 643.057 693.652 642.811 692.006L647.883 681.119C647.883 681.119 648.83 679.384 650.39 677.038C652.152 674.377 654.178 671.901 656.438 669.648C661.35 664.911 660.621 661.821 662.997 654.709C665.373 647.596 672.281 645.235 675.75 640.134C679.219 635.032 677.572 629.202 677.208 622.469C677.12 620.792 677.077 618.752 677.062 616.639C677.062 610.24 677.208 603.142 677.208 603.142C677.208 603.142 671.378 592.939 670.474 588.567C669.57 584.194 664.994 555.598 665.373 547.407C665.752 539.215 702.539 478.262 702.539 478.262L756.088 466.136L800.382 490.374C800.572 494.936 792.176 503.492 789.99 507.5C787.804 511.508 790.894 515.516 788.882 519.524C786.871 523.533 783.242 530.995 787.614 543.384C791.987 555.773 787.804 574.371 790.529 583.291C793.255 592.211 793.809 607.879 793.809 607.879C794.674 607.973 795.51 608.247 796.263 608.684C797.017 609.121 797.67 609.71 798.181 610.415Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M845.55 638.182L856.001 665.379C855.434 666.441 854.618 667.35 853.623 668.028C852.628 668.706 851.483 669.132 850.287 669.271C846.279 669.635 837.534 666.356 833.526 669.271C829.518 672.186 823.688 679.838 816.4 680.566C809.113 681.295 800.368 676.194 794.173 678.016C787.979 679.838 783.606 686.032 761.743 682.753C761.743 682.753 766.845 690.405 761.743 692.227C756.642 694.048 737.694 688.218 737.694 688.218C737.694 688.218 738.788 699.15 737.694 703.887C736.601 708.624 730.407 717.733 730.407 717.733C730.407 717.733 733.322 733.401 730.407 737.045C727.885 740.193 718.266 744.989 715.482 750.717C715.482 750.717 710.002 742.7 709.273 739.96C708.544 737.22 711.634 731.944 709.273 731.39C706.912 730.836 703.997 737.599 701.621 735.413C699.245 733.226 697.977 726.478 701.621 721.566C705.265 716.654 709.273 708.624 701.082 707.72C692.891 706.816 693.605 708.07 691.054 704.251C688.503 700.432 689.043 693.874 691.054 693.32C693.065 692.766 700.353 693.32 700.353 693.32C700.353 693.32 706.533 682.753 710.366 683.292C714.199 683.831 716.925 688.947 716.925 688.947C716.925 688.947 719.111 677.287 724.213 675.83C729.314 674.372 770.663 676.004 772.31 673.468C773.957 670.932 771.392 670 781.784 659.622C792.176 649.245 800.732 637.57 800.368 628.825C800.003 620.08 799.814 612.792 798.181 610.416C797.67 609.712 797.016 609.122 796.263 608.686C795.51 608.249 794.674 607.975 793.809 607.88C793.809 607.88 793.255 592.197 790.529 583.277C787.804 574.358 791.987 555.76 787.614 543.371C783.242 530.982 786.886 523.519 788.882 519.511C790.879 515.503 787.804 511.495 789.99 507.487C792.176 503.479 800.572 494.923 800.382 490.361L808.019 476.325L878.17 505.665L884.714 514.512C867.471 542.919 852.211 568.178 852.109 568.702C843.364 595.419 845.55 638.182 845.55 638.182Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M914.053 864.576L873.723 884.005C872.761 884.5 823.206 824.247 823.206 824.247L815.19 818.665L773.651 815.75L762.952 823.518C762.195 827.216 761.222 830.866 760.037 834.449C759.656 835.611 759.639 836.862 759.988 838.034C760.337 839.206 761.036 840.244 761.99 841.008C762.279 841.271 762.509 841.59 762.666 841.946C762.824 842.303 762.905 842.688 762.905 843.078C762.905 843.468 762.824 843.853 762.666 844.209C762.509 844.566 762.279 844.885 761.99 845.148C759.804 847.086 756.889 840.527 753.974 839.798C752.323 839.4 750.814 838.554 749.613 837.353C748.412 836.152 747.566 834.643 747.168 832.992C746.439 829.348 749.354 825.471 748.873 820.851C748.392 816.23 743.772 816.959 739.151 815.75C734.531 814.54 733.802 812.106 730.406 808.71C727.01 805.314 726.762 808.71 724.095 808.462C721.428 808.214 717.77 799.236 717.041 796.554C716.764 795.519 716.472 794.455 716.137 793.42C717.738 791.175 719.46 789.02 721.297 786.964C723.119 785.142 727.856 784.777 727.856 784.777C728.06 782.596 728.06 780.4 727.856 778.219C727.491 775.304 714.374 760.364 714.738 753.441C714.801 752.492 715.054 751.565 715.481 750.715C718.265 744.987 727.885 740.192 730.406 737.044C733.321 733.4 730.406 717.732 730.406 717.732C730.406 717.732 736.601 708.622 737.694 703.885C738.787 699.149 737.694 688.217 737.694 688.217C737.694 688.217 756.641 694.047 761.743 692.225C766.844 690.403 761.743 682.751 761.743 682.751C783.605 686.031 787.978 679.836 794.172 678.015C800.367 676.193 809.112 681.294 816.399 680.565C823.687 679.836 829.517 672.185 833.525 669.27C837.533 666.354 846.278 669.634 850.287 669.27C851.483 669.131 852.627 668.705 853.622 668.027C854.617 667.349 855.433 666.44 856 665.378L862.063 675.581C862.063 675.581 818.105 698.901 817.128 699.63C816.152 700.358 830.975 727.818 833.161 733.152C835.347 738.487 859.396 771.776 862.559 777.125L914.053 864.576Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M675.751 640.118C672.282 645.219 665.374 647.581 662.998 654.693C660.622 661.806 661.351 664.896 656.439 669.633C654.179 671.886 652.153 674.362 650.39 677.022C650.39 677.022 633.658 678.742 629.985 672.358C626.312 665.974 622.887 648.863 615.235 643.937C608.327 639.564 598.022 637.597 590.851 634.04C590.079 633.661 589.394 633.253 588.636 632.83C581.538 628.458 575.882 628.094 569.324 623.532C562.765 618.97 560.214 617.891 554.02 616.244C547.825 614.597 544.371 609.685 534.708 611.143C534.708 611.143 543.088 600.94 542.36 595.489C541.631 590.038 533.979 583.639 534.708 580.36C535.436 577.081 542.403 573.801 542.403 573.801L560.156 571.251C560.156 571.251 566.583 557.04 568.42 553.221C570.256 549.402 566.773 543.558 566.773 543.558L557.693 546.283C557.693 546.283 557.693 534.273 551.309 530.251C551.309 530.251 553.32 528.254 555.871 520.966C558.421 513.679 554.778 508.388 553.961 503.476C553.145 498.564 557.518 499.293 561.336 499.104C565.155 498.914 564.251 493.084 563.158 489.63C562.065 486.176 555.871 488.172 552.956 487.444C550.041 486.715 547.315 482.342 545.858 479.063C544.4 475.783 544.575 449.009 544.575 449.009L530.175 436.241V430.222L534.008 428.954L535.466 426.228L540.567 427.496C540.567 427.496 540.377 422.774 542.753 422.22C545.129 421.666 546.033 428.954 546.033 428.954L556.06 424.406L562.43 417.672C562.43 417.672 571.175 419.859 575.547 419.305C579.92 418.751 585.21 408.199 585.21 408.199L602.322 404.001L601.593 413.3L595.224 420.937L597.22 430.236L591.39 434.609L586.479 442.508L587.207 452.274C587.207 452.274 585.21 457.375 585.21 469.953C585.21 482.532 589.583 485.447 589.583 485.447L591.041 506.581L598.678 515.501L603.735 509.496L609.259 510.953L614.536 525.339C623.281 525.149 625.292 530.979 625.292 530.979C625.292 530.979 609.259 540.643 605.237 551.574C601.214 562.505 606.519 573.801 606.519 573.801L677.063 616.623C677.063 618.736 677.063 620.777 677.209 622.453C677.573 629.187 679.22 635.017 675.751 640.118Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M561.337 499.106C557.518 499.296 553.146 498.567 553.962 503.479C554.778 508.391 558.422 513.681 555.871 520.969C553.321 528.256 551.309 530.253 551.309 530.253C544.94 526.26 533.28 537.001 533.28 537.001H526.721C526.575 535.296 526.079 533.64 525.264 532.135C524.449 530.631 523.332 529.31 521.984 528.256C517.247 524.248 510.324 529.175 507.409 525.341C504.494 521.508 505.572 509.498 505.572 509.498C505.572 509.498 493.912 500.024 491.537 492.183C489.161 484.342 495.559 482.884 496.638 481.616C497.716 480.348 496.827 476.879 496.827 476.879C498.706 476.975 500.589 476.975 502.468 476.879C504.654 476.704 509.216 473.235 509.216 473.235C509.787 473.879 510.49 474.392 511.277 474.739C512.065 475.087 512.918 475.26 513.778 475.247C515.866 475.141 517.958 475.141 520.046 475.247C518.46 473.167 517.427 470.72 517.043 468.134C516.868 464.665 521.066 461.575 521.241 461.021C520.994 459.526 520.594 458.061 520.046 456.649C520.046 456.649 516.868 455.57 516.314 450.819C515.76 446.067 523.791 445.717 523.791 445.717L519.608 440.441L522.144 439.538L518.836 434.538C521.751 433.081 525.016 430.778 530.161 436.244L544.561 449.011C544.561 449.011 544.386 475.786 545.843 479.065C547.301 482.345 550.027 486.717 552.942 487.446C555.857 488.175 562.051 486.178 563.144 489.632C564.237 493.087 565.156 498.917 561.337 499.106Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M489.19 518.416C489.19 516.959 486.275 515.501 487.732 514.044C490.647 509.671 493.562 508.214 497.935 509.671C492.979 505.882 493.271 502.238 494.437 497.574C493.271 495.825 492.251 493.93 491.668 492.181C489.336 484.311 495.603 482.853 496.769 481.687C497.935 480.521 496.915 477.023 496.915 477.023C498.809 477.169 500.704 477.169 502.599 477.023C504.785 476.877 509.303 473.379 509.303 473.379C510.469 474.691 512.073 475.42 513.822 475.42C515.862 475.274 518.049 475.274 520.089 475.42C518.486 473.379 517.466 470.901 517.028 468.278C516.883 464.78 521.109 461.719 521.255 461.136C520.964 459.679 520.672 458.221 520.089 456.764C520.089 456.764 516.883 455.598 516.3 450.934C515.717 446.27 523.733 445.832 523.733 445.832L519.506 440.585L521.984 439.711L518.632 434.755C518.194 435.047 517.611 435.192 517.174 435.338C513.822 436.358 505.077 436.358 505.368 435.338C506.971 427.322 502.453 426.01 502.453 426.01C502.453 426.01 498.081 425.573 492.979 424.698C487.732 423.824 481.173 423.241 476.947 424.698C473.011 425.719 468.93 426.593 464.995 426.885C464.995 426.885 464.412 429.654 462.809 436.358C461.934 440.294 459.165 443.354 455.521 444.812V450.059C449.691 449.33 442.549 451.371 441.675 454.14C440.946 456.035 442.841 461.573 444.59 466.383C445.319 468.424 446.047 470.464 446.485 471.922C448.088 476.877 448.671 510.837 448.671 510.837C448.962 517.396 456.687 522.643 456.687 522.643L460.185 524.246L465.87 534.012C467.91 534.303 469.805 534.741 471.845 535.324C472.574 535.615 477.53 538.967 477.53 538.967C478.55 537.218 480.59 536.635 482.485 537.364C485.546 538.822 485.692 545.235 485.692 545.235C487.295 545.38 488.898 544.943 490.21 544.214C488.024 535.469 493.417 527.016 489.19 518.416Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M567.021 543.485L557.984 546.254C557.984 546.254 557.984 534.157 551.571 530.222C545.158 526.286 533.498 536.926 533.498 536.926H526.939C526.648 533.428 524.899 530.368 522.275 528.181C517.466 524.1 510.615 529.056 507.7 525.266C504.785 521.477 505.805 509.379 505.805 509.379C505.805 509.379 498.809 503.695 494.437 497.428C493.271 502.092 492.979 505.881 497.935 509.525C493.562 508.068 490.647 509.525 487.732 513.898C486.275 515.355 489.19 516.813 489.19 518.27C493.417 526.869 488.024 535.323 490.502 543.922C491.522 543.339 492.542 542.465 493.271 541.445L495.894 548.586H500.996C512.364 561.704 518.777 580.652 518.777 580.652C523.15 577.008 527.96 573.801 533.061 571.178C540.64 567.388 542.535 573.801 542.535 573.801L560.316 571.178C560.316 571.178 566.729 556.894 568.624 553.105C570.228 549.315 567.021 543.485 567.021 543.485Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
					<HtmlTooltip title={<CustomTooltipContent data='123' />} followCursor>
						<path
							d='M471.525 574.705C471.101 575.987 470.272 577.097 469.164 577.868C466.934 579.223 464.077 578.057 461.497 576.891C457.853 575.259 452.927 569.254 452.927 569.254L445.1 573.072L443.832 578.48C441.85 578.217 440.363 578.174 440.363 578.174V574.705L433.804 571.44V560.13C433.804 560.13 421.969 553.032 418.865 551.764C415.76 550.496 408.123 551.385 407.744 550.845C407.365 550.306 402.657 538.763 402.657 538.763C403.685 538.886 404.723 538.627 405.572 538.034C409.216 535.352 407.409 526.068 407.409 526.068C407.409 526.068 414.507 523.517 417.232 526.068C419.958 528.618 431.633 529.901 431.633 529.901C431.633 529.901 432.361 522.788 435.451 519.319C438.541 515.85 448.948 510.574 448.948 510.574C449.298 517.133 456.964 522.424 456.964 522.424C457.578 525.176 457.9 527.985 457.926 530.805C458.174 536.635 468.435 544.097 468.129 553.571C467.823 563.045 473.711 569.254 471.525 574.705Z'
							fill='#1D728E'
							stroke='white'
							strokeWidth='0.728756'
						/>
					</HtmlTooltip>
				</g>
			</svg>
		</Box>
	)
}

export default HomeMapCard
