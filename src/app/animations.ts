import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

var animationTimeInMilliseconds = "600";
var easing = "ease";
const optional = { optional: true };

export const siteAnimations =
    trigger('routeAnimations', [
        transition('isRight => isLeft', slideTo('left')),
        transition('isLeft => isRight', slideTo('right')),
        transition('continuing => isLeft', slideTo('left')),
        transition('continuing => isRight', slideTo('right')),
        transition('isRight => continuing', slideTo('right')),
        transition('isLeft => continuing', slideTo('left')),
        transition('isRight => isLeft', slideTo('left')),
        transition('isLeft => isRight', slideTo('right')),
        transition('* <=> *', fadeIn())
    ]);

function fadeIn() {
    return [
        // Set a default  style for enter and leave
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left: 0,
                width: '100%',
                opacity: 0,
                transform: 'scale(0)',
            }),
        ], optional),
        // Animate the new page in
        query(':enter', [
            animate(`${animationTimeInMilliseconds}ms ${easing}`, style({ opacity: 1, transform: 'scale(1)' })),
        ], optional)
    ];
}

function slideTo(direction: string) {
    //Default left
    var initial = '-100%';
    var exiting = '100%';
    if(direction.toLowerCase() == 'right'){
        initial = '100%';
        exiting = '-100%';
    }
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        group([
            query(':enter', [
                style({ transform: `translateY(${initial})` }),
                animate(`${animationTimeInMilliseconds}ms ${easing}`, style({ transform: 'translateY(0%)' }))
            ], optional),
            query(':leave', [
                animate(`${animationTimeInMilliseconds}ms ${easing}`, style({ transform: `translateY(${exiting})` }))
            ], optional)
        ]),
        query(':leave', animateChild(), optional),
        query(':enter', animateChild(), optional),
    ];
}