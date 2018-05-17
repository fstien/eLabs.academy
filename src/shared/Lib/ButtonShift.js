
import React from 'react'


class ButtonShift extends React.Component {
  constructor(props) {
    super(props);

    this.W = 55; 
    this.H = 95;

    this.border = 0.1;
    this.clickFrac = 0.2;
    this.curveGap = 0.02;

    this.letterVertGap = 0.05;
    this.letterHorGap = 0.07;

    this.borderWidth = 1;
    this.borderColor = '#36ccc1'

    this.baseColor = '#44fff2'
    this.hoverColor = '#3de5d9'
    this.clickColor = '#36ccc1'

    this.backgroundColor = 'white'

  }

  componentDidMount() { 

    this.draw = SVG(this.props.id + "Button").size(this.W, this.H)

    this.rect = this.draw.rect('100%', '100%').attr({ fill: 'none' })


    this.whiteBackground = this.draw.path('M ' + this.W*this.border + ' ' + (1 - this.border - this.clickFrac)*this.H + ' L ' + this.W*this.border + ' ' + (this.border+this.clickFrac)*this.H  + ' L ' + 0.5*this.W + ' ' + this.border*this.H + ' L ' + (1-this.border)*this.W + ' ' + (this.border + this.clickFrac)*this.H + ' L ' + (1-this.border)*this.W + ' ' + (1-this.border-this.clickFrac)*this.H + ' L ' + 0.5*this.W + ' ' + (1-this.border)*this.H);
    this.whiteBackground.fill(this.backgroundColor)


    this.lineLeft = this.draw.line(this.W*this.border, (this.border + this.clickFrac)*this.H, this.W*this.border, (1-this.border-this.clickFrac)*this.H).stroke({ width: this.borderWidth, color: this.borderColor })

    this.lineRight = this.draw.line(this.W*(1-this.border), (this.border + this.clickFrac)*this.H, this.W*(1-this.border), (1-this.border-this.clickFrac)*this.H).stroke({ width: this.borderWidth, color: this.borderColor })
    
    
    
    this.pathFillTop = this.draw.path('M ' + this.border*this.W + ' ' + (this.border + this.clickFrac)*this.H + ' C ' + this.border*this.W + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ', ' + this.border*this.W  + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ',' + 0.5*this.W + ' ' + this.border*this.H + ' C ' + (1-this.border)*this.W  + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ' ' + (1-this.border)*this.W  + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ',' + (1-this.border)*this.W + ' ' + (this.border + this.clickFrac)*this.H + ' C ' + (1-this.border)*this.W + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ', ' + this.border*this.W  + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ',' + this.border*this.W + ' ' + (this.border + this.clickFrac)*this.H )

    this.pathFillTop.fill(this.baseColor)

    this.pathFillTop.on('mouseenter', () => { 
      this.pathFillTop.fill(this.hoverColor)
    })
    this.pathFillTop.on('mouseleave', () => { 
      this.pathFillTop.fill(this.baseColor)
    })

    this.pathFillTop.on('mousedown', () => { 
      this.pathFillTop.fill(this.clickColor)
    })

    this.pathFillTop.on('mouseup', () => { 
      this.pathFillTop.fill(this.hoverColor)
    })

    this.pathFillTop.addClass('buttonPath');


    this.pathFillBottom = this.draw.path('M ' + this.border*this.W + ' ' + (1 - this.border - this.clickFrac)*this.H + ' C ' + this.border*this.W + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ', ' + this.border*this.W  + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ',' + 0.5*this.W + ' ' + (1-this.border)*this.H + ' C ' + (1-this.border)*this.W  + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ' ' + (1-this.border)*this.W  + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ',' + (1-this.border)*this.W + ' ' + (1 - this.border - this.clickFrac)*this.H + ' C ' + (1-this.border)*this.W + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ', ' + this.border*this.W  + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ',' + this.border*this.W + ' ' + (1 - this.border - this.clickFrac)*this.H )

    this.pathFillBottom.fill(this.baseColor)


    this.pathFillBottom.on('mouseenter', () => { 
      this.pathFillBottom.fill(this.hoverColor)
    })
    this.pathFillBottom.on('mouseleave', () => { 
      this.pathFillBottom.fill(this.baseColor)
    })

    this.pathFillBottom.on('mousedown', () => { 
      this.pathFillBottom.fill(this.clickColor)
    })

    this.pathFillBottom.on('mouseup', () => { 
      this.pathFillBottom.fill(this.hoverColor)
    })

    this.pathFillBottom.addClass('buttonPath');


    this.pathTopLeft = this.draw.path('M ' + this.border*this.W + ' ' + (this.border + this.clickFrac)*this.H + ' C ' + this.border*this.W + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ', ' + this.border*this.W  + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ',' + 0.5*this.W + ' ' + this.border*this.H)

    this.pathTopLeft.fill('none')
    this.pathTopLeft.stroke({ width: this.borderWidth,  color: this.borderColor})

    this.pathTopRight = this.draw.path('M ' + (1-this.border)*this.W + ' ' + (this.border + this.clickFrac)*this.H + ' C ' + (1-this.border)*this.W + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ', ' + (1-this.border)*this.W  + ' ' + (this.border + this.clickFrac - this.curveGap)*this.H + ',' + 0.5*this.W + ' ' + this.border*this.H)

    this.pathTopRight.fill('none')
    this.pathTopRight.stroke({ width: this.borderWidth,  color: this.borderColor})



    this.pathBottomLeft = this.draw.path('M ' + this.border*this.W + ' ' + (1 - this.border - this.clickFrac)*this.H + ' C ' + this.border*this.W + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ', ' + this.border*this.W  + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ',' + 0.5*this.W + ' ' + (1 - this.border)*this.H)

    this.pathBottomLeft.fill('none')
    this.pathBottomLeft.stroke({ width: this.borderWidth,  color: this.borderColor})

    this.pathBottomRight = this.draw.path('M ' + (1-this.border)*this.W + ' ' + (1 - this.border - this.clickFrac)*this.H + ' C ' + (1-this.border)*this.W + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ', ' + (1-this.border)*this.W  + ' ' + (1 - this.border - this.clickFrac + this.curveGap)*this.H + ',' + 0.5*this.W + ' ' + (1 - this.border)*this.H)

    this.pathBottomRight.fill('none')
    this.pathBottomRight.stroke({ width: this.borderWidth,  color: this.borderColor})



    this.image = this.draw.image('/media/' + this.props.letter + '.png', (1 - this.border*2 - 2*this.letterHorGap)*this.W, (1 - 2*(this.border + this.clickFrac) - 2*this.letterVertGap)*this.H).move(this.W*0.5 - 0.5*(1 - this.border*2)*this.W + this.letterHorGap*this.W, 0.5*this.H - 0.5*(1 - 2*(this.border + this.clickFrac))*this.H + this.letterVertGap*this.H)


    this.pathFillTop.on('click', () => {
      this.topClick();
    })

    this.pathFillBottom.on('click', () => {
      this.bottomClick();
    })


  }

  topClick() { 

    if( (Math.round(eval('g["' + this.props.letter + '"].' + 'get()') * 1000) / 1000) < this.props.max ) { 

      eval('g["' + this.props.letter + '"].' + this.props.top);
      
      if(this.props.streamInit) {
        store.dispatch({ 
          type: 'InitStream',
        })
      }
    }

  }

  bottomClick() { 

    if( (Math.round(eval('g["' + this.props.letter + '"].' + 'get()') * 1000) / 1000) > this.props.min ) { 

      eval('g["' + this.props.letter + '"].' + this.props.bottom);
      
      if(this.props.streamInit) {
        store.dispatch({ 
          type: 'InitStream',
        })
      }
    }

  }

  render() {
    return (
      <div className="ButtonShift" id={this.props.id + "Button"}> 

      </div>      

    );
  }
}


  
export default ButtonShift;

